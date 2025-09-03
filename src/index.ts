import { html, LitElement, PropertyValues, TemplateResult, CSSResult } from "lit";
import { property } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import { createThing } from "custom-card-helpers";
import type { HassEntities } from "home-assistant-js-websocket";

// Eigene Module
import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderRows, renderTitle } from "./entity";
import { getEntityIds, parseConfig } from "./util";
import { hideIfCard } from "./hide";
import { style } from "./styles";
import type { HomeAssistantEntity, RoomCardConfig, RoomCardLovelaceCardConfig } from "./types/room-card-types";

// Editor registrieren (wichtig für visuellen Editor)
import "./editor";

// Diagnose-Log, zeigt dass die Ressource geladen wurde
console.info("ROOM-CARD: script executed");

// Lovelace-Katalog-Eintrag (idempotent)
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean }>;
    loadCardHelpers?: () => Promise<{ createCardElement(config: LovelaceCardConfig): LovelaceCard }>;
  }
}
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "room-card")) {
  window.customCards.push({
    type: "room-card",
    name: "Room Card",
    description:
      "Show multiple entity states, attributes and icons in a single card in Home Assistant's Lovelace UI",
    preview: true,
  });
}

export class RoomCard extends LitElement {
  // ----- Lovelace Hooks (Editor-Unterstützung) -----
  static getConfigElement() {
    return document.createElement("room-card-editor");
  }
  static getStubConfig(hass?: HomeAssistant, entities?: string[]) {
    const first = Array.isArray(entities) && entities.length ? entities[0] : undefined;
    return { type: "custom:room-card", title: "Room", entity: first, show_icon: true };
  }

  // ----- Reactive Properties -----
  @property({ attribute: false }) monitoredStates?: HassEntities = {};
  @property({ attribute: false }) _hass?: HomeAssistant;
  @property({ attribute: false }) config?: RoomCardConfig;

  // Nicht reaktiv
  private _configError?: string;
  private stateObj?: HomeAssistantEntity;

  // Card helpers (werden ggf. dynamisch geladen)
  private _helpers?: { createCardElement(config: LovelaceCardConfig): LovelaceCard };

  // ----- Lifecycle / Update Steuerung -----
  protected shouldUpdate(changed: PropertyValues): boolean {
    // locker: rendere, sobald Config + HASS vorhanden und sich etwas ändert
    return !!this.config && !!this._hass && changed.size > 0;
  }

  // ----- Setup -----
  private getChildCustomCardTypes(cards: RoomCardLovelaceCardConfig[] | undefined, target: Set<string>) {
    if (!cards) return;
    for (const card of cards) {
      if (card?.type?.startsWith?.("custom:")) target.add(card.type.substring(7));
      this.getChildCustomCardTypes(card.cards, target);
    }
  }

  private async waitForDependentComponents(config: RoomCardConfig) {
    const types = new Set<string>();
    this.getChildCustomCardTypes(config.cards, types);
    await Promise.all(Array.from(types).map((t) => customElements.whenDefined(t)));
  }

  async setConfig(config: RoomCardConfig) {
    this._configError = undefined;

    // checkConfig darf die Anzeige nicht verhindern
    try {
      checkConfig(config);
    } catch (e: any) {
      this._configError = e?.message || String(e);
      console.warn("ROOM-CARD config warning:", e);
    }

    // entityIds vorbereiten (fail-safe)
    this.config = { ...(config || {}), entityIds: getEntityIds(config || ({} as any)) };

    // Im Editor nicht auf fremde Custom-Cards warten (Freeze vermeiden)
    const inEditor = document.querySelector("hui-card-editor") !== null;
    if (!inEditor) {
      await this.waitForDependentComponents(this.config);
    }

    if (typeof window.loadCardHelpers === "function") {
      this._helpers = await window.loadCardHelpers();
    }
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (hass && this.config) {
      this.updateMonitoredStates(hass);
      this.config.hass = hass;
    }
  }

  private updateMonitoredStates(hass: HomeAssistant): void {
    const newStates: HassEntities = { ...(this.monitoredStates || {}) } as HassEntities;
    let anyUpdates = false;

    for (const entityId of this.config!.entityIds) {
      if (entityId in hass.states) {
        const prev = this.monitoredStates && (this.monitoredStates as HassEntities)[entityId];
        const incoming = hass.states[entityId];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (
          !this.monitoredStates ||
          (prev as any)?.last_updated < (incoming as any).last_updated ||
          (prev as any)?.last_changed < (incoming as any).last_changed ||
          incoming !== (newStates as any)[entityId]
        ) {
          anyUpdates = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (newStates as any)[entityId] = incoming;
        }
      } else if (this.monitoredStates && entityId in (this.monitoredStates as HassEntities)) {
        anyUpdates = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (newStates as any)[entityId];
      }
    }

    if (anyUpdates) this.monitoredStates = newStates;
  }

  // ----- Styles -----
  static get styles(): CSSResult {
    return style;
  }

  // ----- Rendering -----
  render(): TemplateResult {
    if (!this.config) return html``;

    // Editor/Preview ohne hass
    if (!this._hass) {
      const t = this.config.title ?? "Room";
      return html`
        <ha-card elevation="2">
          <div class="card-header"><div class="name">${t}</div></div>
          <div style="padding:12px; opacity:.7">Preview…</div>
        </ha-card>
      `;
    }

    // Falls checkConfig o. ä. gemeckert hat → sichtbar machen
    if (this._configError) {
      return html`<hui-warning>${this._configError}</hui-warning>`;
    }

    try {
      // parseConfig kann werfen – deshalb *innerhalb* des try/catch
      const { entity, info_entities = [], entities = [], rows = [], stateObj } = parseConfig(this.config, this._hass);
      this.stateObj = stateObj;

      return html`
        <ha-card elevation="2" style="${entityStyles(this.config.card_styles, stateObj, this._hass)}">
          <div class="card-header">
            ${renderTitle(this.config, this._hass, this, entity)}
            <div class="entities-info-row">
              ${info_entities.map((ie) => renderInfoEntity(ie, this._hass!, this))}
            </div>
          </div>

          ${rows && rows.length > 0
            ? renderRows(rows, this._hass, this)
            : renderEntitiesRow(this.config, entities, this._hass, this)}

          ${this.config.cards?.map((card) => this.createCardElement(card, this._hass!))}
        </ha-card>
      `;
    } catch (e: any) {
      console.warn("ROOM-CARD render error:", e);
      return html`<hui-warning>${e?.toString?.() ?? e}</hui-warning>`;
    }
  }

  getCardSize(): number {
    const numberOfCards = this.config?.cards ? this.config.cards.length : 0;
    const numberOfRows = this.config?.rows ? this.config.rows.length : 0;
    const mainSize = !this.config?.info_entities && this.config?.hide_title ? 1 : 2;
    const entitiesRow = this.config?.entities && this.config.entities.length > 0 ? 1 : 0;
    return numberOfCards + numberOfRows + entitiesRow + mainSize;
  }

  private createCardElement(config: RoomCardLovelaceCardConfig, hass: HomeAssistant) {
    if (
      hideIfCard(config, hass) ||
      (config.show_states && config.entity && !config.show_states.includes(hass.states[config.entity]?.state))
    ) {
      return null;
    }

    let element: LovelaceCard;
    if (this._helpers) element = this._helpers.createCardElement(config);
    else element = createThing(config);

    (element as any).hass = hass;
    (element.style as any).boxShadow = "none";
    (element.style as any).borderRadius = "0";
    return element;
  }
}

// Manuelle, idempotente Registrierung
const TAG = "room-card";
if (!customElements.get(TAG)) {
  customElements.define(TAG, RoomCard);
  console.info("ROOM-CARD: custom element defined");
}
export default RoomCard;
