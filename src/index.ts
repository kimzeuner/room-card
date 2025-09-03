import { html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

// Editor registrieren, damit der visuelle Editor weiterhin aufgeht
import "./editor";

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean }>;
  }
}

// Lovelace-Katalog-Eintrag (idempotent)
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "room-card")) {
  window.customCards.push({
    type: "room-card",
    name: "Room Card",
    description: "Diagnostic build: always renders a visible card.",
    preview: true,
  });
}

export class RoomCard extends LitElement {
  @property({ attribute: false }) config?: any;
  @property({ attribute: false }) _hass?: any;

  private _configError?: string;

  // Editor-Hooks
  static getConfigElement() {
    return document.createElement("room-card-editor");
  }
  static getStubConfig(_hass?: any, entities?: string[]) {
    const first = Array.isArray(entities) && entities.length ? entities[0] : undefined;
    return { type: "custom:room-card", title: "Room", entity: first, show_icon: true };
  }

  // Konfig setzen – NICHT mehr werfen
  async setConfig(config: any) {
    console.info("ROOM-CARD setConfig()", config);
    this._configError = undefined;
    try {
      if (!config) throw new Error("Empty config");
    } catch (e: any) {
      this._configError = e?.message || String(e);
      console.warn("ROOM-CARD config warning:", e);
    }
    this.config = { ...(config || {}) };
  }

  // hass Setter
  set hass(hass: any) {
    this._hass = hass;
    this.requestUpdate();
  }

  // Immer etwas rendern:
  render(): TemplateResult {
    const cfg = this.config || {};
    // Vorschau im Editor ohne hass
    if (!this._hass) {
      return html`<ha-card>
        <div class="card-header"><div class="name">${cfg.title ?? "Room"}</div></div>
        <div style="padding:12px;opacity:.7">It works (preview)</div>
      </ha-card>`;
    }
    // Sichtbare Warnung statt „nichts“
    if (this._configError) {
      return html`<hui-warning>${this._configError}</hui-warning>`;
    }
    // Simple „It works“-Karte
    return html`<ha-card>
      <div class="card-header"><div class="name">${cfg.title ?? "Room"}</div></div>
      <div style="padding:12px">
        It works with hass<br />
        Entity: ${cfg.entity ?? "—"}
      </div>
    </ha-card>`;
  }
}

// Manuelle, idempotente Registrierung
const TAG = "room-card";
if (!customElements.get(TAG)) {
  customElements.define(TAG, RoomCard);
  console.info("ROOM-CARD: custom element defined");
}

// Ein Default-Export – nur EINMAL!
export default RoomCard;

// Diagnose-Log, zeigt dass die Ressource geladen wurde
console.info("ROOM-CARD: script executed (diagnostic)");
