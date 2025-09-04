import { html, LitElement, TemplateResult, CSSResult } from "lit";
import { property } from "lit/decorators.js";

import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import { createThing } from "custom-card-helpers";
import type { HassEntities } from "home-assistant-js-websocket";

import { checkConfig, entityStyles, renderEntitiesRow, renderInfoEntity, renderRows, renderTitle } from "./entity";
import { getEntityIds, parseConfig } from "./util";
import { hideIfCard } from "./hide";
import { style } from "./styles";
import type { HomeAssistantEntity, RoomCardConfig, RoomCardLovelaceCardConfig } from "./types/room-card-types";

// Keine Editor-Importe oben erzwingen; Proxy lädt bei Bedarf dynamisch.
// import "./editor";

console.info("ROOM-CARD: script executed");

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

/** Proxy-Editor: lädt ./editor dynamisch und ersetzt sich selbst durch <room-card-editor>. */
class RoomCardEditorProxy extends HTMLElement {
  private _config: any;
  private _hass: any;
  private _real?: any;
  private _loaded = false;

  constructor() {
    super();
    const sr = this.attachShadow({ mode: "open" });
    sr.innerHTML = `<div style="padding:8px;opacity:.7">Loading editor…</div>`;
  }

  setConfig(cfg: any) {
    this._config = cfg;
    if (this._real && typeof this._real.setConfig === "function") this._real.setConfig(cfg);
  }

  set hass(h: any) {
    this._hass = h;
    if (this._real) this._real.hass = h;
  }

  connectedCallback() {
    // nur einmal laden
    if (this._loaded) return;
    this._loaded = true;
    this._load();
  }

  private async _load() {
    try {
      if (!customElements.get("room-card-editor")) {
        // dynamisch laden und auf Definition warten
        await import("./editor");
        await customElements.whenDefined("room-card-editor");
      }
      const real = document.createElement("room-card-editor") as any;
      this._real = real;
      if (this._config) real.setConfig(this._config);
      if (this._hass) real.hass = this._hass;
      // Proxy durch echten Editor ersetzen
      this.replaceWith(real);
    } catch (e) {
      console.error("ROOM-CARD: failed to load editor", e);
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML =
          `<div style="padding:8px;color:var(--error-color, #d32f2f)">Editor failed to load.</div>`;
      }
    }
  }
}
if (!customElements.get("room-card-editor-proxy")) {
  customElements.define("room-card-editor-proxy", RoomCardEditorProxy);
}

export class RoomCard extends LitElement {
  // ----- Lovelace Hooks (Editor-Unterstützung) -----
  static getConfigElement() {
    console.info("ROOM-CARD: getConfigElement()");
    // Proxy zurückgeben (lädt echten Editor nach)
    return document.createElement("room-card-editor-proxy");
  }
  static getStubConfig(_hass?: HomeAssistant, entities?: string[]) {
    const first = Array.isArray(entities) && entities.length ? entities[0] : undefined;
    return { type: "custom:room-card", title: "Room", entity: first, show_icon: true };
  }

  @property({ attribute: false }) monitoredStates?: HassEntities = {};
  @property({ attribute: false }) _hass?: HomeAssistant;
  @property({ attribute: false }) config?: RoomCardConfig;

  private _configError?: string;
  private stateObj?: HomeAssistantEntity;
  private _helpers?: { createCardElement(config: LovelaceCardConfig): LovelaceCard };

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
    if (types.size) await Promise.all(Array.from(types).map((t) => customElements.whenDefined(t)));
  }

  async setConfig(config: RoomCardConfig) {
    this._configError = undefined;
    try {
      checkConfig(config);
    } catch (e: any) {
      this._configError = e?.message || String(e);
      console.warn("ROOM-CARD config warning:", e);
    }
    this.config = { ...(config || {}), entityIds: getEntityIds(config || ({} as any)) };

    const inEditor = document.querySelector("hui-card-editor") !== null;
    if (!inEditor) {
      await this.waitForDependentComponents(this.config);
    }

    if (typeof window.loadCardHelpers === "function") {
      this._helpers = await window.loadCardHelpers();
    }
    this.requestUpdate();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (hass && this.config) {
      this.updateMonitoredStates(hass);
      (this.config as any).hass = hass;
    }
    this.requestUpdate();
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
