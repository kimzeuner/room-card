import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { RoomCardConfig } from "./types/room-card-types";

console.info("ROOM-CARD-EDITOR: module loaded");

// Feature-Checks (zur Laufzeit)
const has = {
  textfield: () => !!customElements.get("ha-textfield"),
  entityPicker: () => !!customElements.get("ha-entity-picker"),
  iconPicker: () => !!customElements.get("ha-icon-picker"),
  mwcSwitch: () => !!customElements.get("mwc-switch"),
};

@customElement("room-card-editor")
export class RoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RoomCardConfig;

  constructor() {
    super();
    console.info("ROOM-CARD-EDITOR: constructed");
  }

  public setConfig(config: RoomCardConfig): void {
    console.info("ROOM-CARD-EDITOR: setConfig()", config);
    try {
      this._config = {
        ...config,
        entities: Array.isArray(config.entities) ? [...config.entities] : [],
      } as RoomCardConfig;
    } catch (e) {
      console.warn("room-card-editor: setConfig failed", e);
      this._config = { ...(config || {}), entities: [] } as RoomCardConfig;
    }
    this.requestUpdate();
  }

  // ---------- Helpers ----------
  private _emitChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  private _set<K extends keyof RoomCardConfig>(key: K, value: RoomCardConfig[K]) {
    this._config = { ...(this._config || {}), [key]: value } as RoomCardConfig;
    this._emitChanged();
  }

  private _ensureEntities(): void {
    if (!this._config) return;
    if (!Array.isArray(this._config.entities)) {
      this._config = { ...this._config, entities: [] } as RoomCardConfig;
    }
  }

  private _addEntity = () => {
    if (!this._config) return;
    this._ensureEntities();
    const entities = [...(this._config!.entities || [])];
    entities.push({ entity: "", show_icon: true });
    this._config = { ...this._config!, entities } as RoomCardConfig;
    this._emitChanged();
  };

  private _removeEntity = (index: number) => {
    if (!this._config?.entities) return;
    const entities = [...this._config.entities];
    entities.splice(index, 1);
    this._config = { ...this._config, entities } as RoomCardConfig;
    this._emitChanged();
  };

  private _updateEntity = (index: number, key: string, value: any) => {
    if (!this._config) return;
    this._ensureEntities();
    const entities = [...(this._config!.entities || [])];
    entities[index] = { ...(entities[index] || {}), [key]: value };
    this._config = { ...this._config!, entities } as RoomCardConfig;
    this._emitChanged();
  };

  // ---------- UI Bausteine mit Fallbacks ----------
  private _TF(label: string, value: string, onInput: (v: string) => void) {
    return has.textfield()
      ? html`<ha-textfield
          .value=${value ?? ""}
          label=${label}
          @input=${(e: any) => onInput(e.currentTarget.value)}
        ></ha-textfield>`
      : html`<label class="lbl"
          >${label}
          <input class="plain" .value=${value ?? ""} @input=${(e: any) => onInput(e.currentTarget.value)} />
        </label>`;
  }

  private _EntityPicker(label: string, value: string, onChange: (v: string) => void) {
    // Nur sinnvoll mit hass UND wenn die Komponente existiert
    return this.hass && has.entityPicker()
      ? html`<ha-entity-picker
          .hass=${this.hass}
          .value=${value ?? ""}
          allow-custom-entity
          label=${label}
          @value-changed=${(e: any) => onChange(e.detail.value)}
        ></ha-entity-picker>`
      : this._TF(label + " (entity_id)", value, onChange);
  }

  private _IconPicker(value: string, onChange: (v: string) => void) {
    return has.iconPicker()
      ? html`<ha-icon-picker
          .value=${value ?? ""}
          label="Icon"
          @value-changed=${(e: any) => onChange(e.detail.value)}
        ></ha-icon-picker>`
      : this._TF("Icon (mdi:…)", value, onChange);
  }

  private _Switch(label: string, checked: boolean, onChange: (v: boolean) => void) {
    return has.mwcSwitch()
      ? html`<mwc-formfield label=${label}>
          <mwc-switch .checked=${!!checked} @change=${(e: any) => onChange(e.currentTarget.checked)}></mwc-switch>
        </mwc-formfield>`
      : html`<label class="lbl"
          ><input
            type="checkbox"
            .checked=${!!checked}
            @change=${(e: any) => onChange(e.currentTarget.checked)}
          />
          ${label}
        </label>`;
  }

  // ---------- Render (immer sichtbar, egal ob hass gesetzt ist) ----------
  protected render(): TemplateResult {
    if (!this._config) {
      return html`<div class="hint">Loading editor…</div>`;
    }
    const c = this._config;

    return html`
      <div class="form">
        <div class="section">
          <div class="section-title">Header</div>
          ${this._TF("Title", c.title ?? "", (v) => this._set("title", v))}
          ${this._Switch("Hide title", !!c.hide_title, (v) => this._set("hide_title", v))}
        </div>

        <div class="section">
          <div class="section-title">
            Entities
            <mwc-button dense @click=${this._addEntity}>Add entity</mwc-button>
          </div>

          ${Array.isArray(c.entities) && c.entities.length
            ? c.entities.map(
                (ent: any, i: number) => html`
                  <div class="entity-row">
                    ${this._EntityPicker("Entity", ent.entity ?? "", (v) => this._updateEntity(i, "entity", v))}
                    ${this._IconPicker(ent.icon ?? "", (v) => this._updateEntity(i, "icon", v))}
                    ${this._Switch(
                      "Show icon",
                      ent.show_icon !== false,
                      (v) => this._updateEntity(i, "show_icon", v),
                    )}
                    <mwc-button dense class="danger" @click=${() => this._removeEntity(i)}>Remove</mwc-button>
                  </div>
                `,
              )
            : html`<div class="hint">No entities yet. Click “Add entity”.</div>`}
        </div>

        <div class="section">
          <div class="section-title">Advanced</div>
          ${this._EntityPicker("Primary entity (optional)", c.entity ?? "", (v) => this._set("entity", v))}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 4px 0 8px;
    }
    .form {
      display: grid;
      gap: 16px;
    }
    .section {
      display: grid;
      gap: 12px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    .section:first-child {
      border-top: none;
    }
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
    }
    .entity-row {
      display: grid;
      grid-template-columns: 1fr 180px auto auto;
      align-items: center;
      gap: 12px;
    }
    .hint {
      opacity: 0.7;
      font-style: italic;
    }
    .lbl {
      display: grid;
      gap: 6px;
      font-size: 0.9rem;
    }
    input.plain {
      padding: 8px;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    mwc-button.danger {
      --mdc-theme-primary: var(--error-color, #d32f2f);
    }
  `;
}

// Doppelte Registrierung vermeiden
if (!customElements.get("room-card-editor")) {
  customElements.define("room-card-editor", RoomCardEditor);
}
export default RoomCardEditor;
