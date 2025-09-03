import { CSSResult, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

// HA/Lovelace Typen nur als Types importieren (keine Runtime-Bundles)
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

// Diagnose: zeigt, dass das Script geladen wurde
console.info("ROOM-CARD: script executed");

// Lovelace-Metadaten für den Kartenkatalog im Editor (idempotent)
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean }>;
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

@customElement("room-card")
export default class RoomCard extends LitElement {
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

  // Card helpers (werden ggf. dynamisch geladen)
  _helpers?: { createCardElement(config: LovelaceCardConfig): LovelaceCard };

  private stateObj: HomeAssistantEntity | undefined;

  // ----- Lifecycle / Update Steuerung -----
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    // Locker: rendere, sobald wir Config + HASS haben und sich etwas geändert hat.
    return !!this.config && !!this._hass && changedProps.size > 0;
  }

  // ----- Setup -----
  private getChildCustomCardTypes(cards: RoomCardLovelaceCardConfig[] | undefined, target: Set<string>) {
    if (!cards) return;
    for (const card of cards) {
      if (card.type?.startsWith?.("custom:")) {
        target.add(card.type.substring(7));
      }
      this.getChildCustomCardTypes(card.cards, target);
    }
  }

  private async waitForDependentComponents(config: RoomCardConfig) {
    const distinctTypes = new Set<string>();
    this.getChildCustomCardTypes(config.cards, distinctTypes);
    await Promise.all(Array.from(distinctTypes).map((type) => customElements.whenDefined(type)));
  }

  async setConfig(config: RoomCardConfig) {
    checkConfig(config);

    this.config = { ...config, entityIds: getEntityIds(config) };

    // Im Editor nicht auf fremde Custom-Cards warten, um Freeze zu vermeiden
    const inEditor = document.querySelector("hui-card-editor") !== null;
    if (!inEditor) {
      await this.waitForDependentComponents(this.config);
    }

    // Card helpers laden (falls verfügbar)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyWindow = window as any;
    if (typeof anyWindow.loadCardHelpers === "function") {
      this._helpers = await anyWindow.loadCardHelpers();
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
        const monitoredEntity = this.monitoredStates && (this.monitoredStates as HassEntities)[entityId];
        const incoming = hass.states[entityId];

        // Aktualisieren, wenn last_updated/last_changed neuer sind
        // oder der Referenzvergleich sich ändert (failsafe).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (
          !this.monitoredStates ||
          (monitoredEntity as any)?.last_updated < (incoming as any).last_updated ||
          (monitoredEntity as any)?.last_changed < (incoming as any).last_changed ||
          incoming !== (newStates as any)[entityId]
        ) {
          anyUpdates = true;
          (newStates as any)[entityId] = incoming;
        }
      } else if (this.monitoredStates && entityId in (this.monitoredStates as HassEntities)) {
        anyUpdates = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (newStates as any)[entityId];
      }
    }

    if (anyUpdates) {
      this.monitoredStates = newStates;
    }
  }

  // ----- Styles -----
  static get styles(): CSSResult {
    return style;
  }

  // ----- Rendering -----
  render(): TemplateResult {
    if (!this._hass || !this.config) return html``;

    const { entity, info_entities, entities, rows, stateObj } = parseConfig(this.config, this._hass);
    this.stateObj = stateObj;

    try {
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
    } catch (error: any) {
      return html`<hui-warning>${error?.toString?.() ?? error}</hui-warning>`;
    }
  }

  getCardSize(): number {
    const numberOfCards = this.config?.cards ? this.config.cards.length : 0;
    const numberOfRows = this.config?.rows ? this.config.rows.length : 0;
    const mainSize = !this.config?.info_entities && this.config?.hide_title ? 1 : 2;
    const entitiesRow = this.config?.entities && this.config.entities.length > 0 ? 1 : 0;

    return numberOfCards + numberOfRows + entitiesRow + mainSize;
  }

  createCardElement(config: RoomCardLovelaceCardConfig, hass: HomeAssistant) {
    if (
      hideIfCard(config, hass) ||
      (config.show_states && config.entity && !config.show_states.includes(hass.states[config.entity]?.state))
    ) {
      return null;
    }

    let element: LovelaceCard;
    if (this._helpers) {
      element = this._helpers.createCardElement(config);
    } else {
      element = createThing(config);
    }

    element.hass = hass;
    (element.style as any).boxShadow = "none";
    (element.style as any).borderRadius = "0";
    return element;
  }
}

// Defensive: nur einmal registrieren (falls Ressource doppelt geladen wird)
if (!customElements.get("room-card")) {
  customElements.define("room-card", RoomCard);
}
