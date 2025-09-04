import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { RoomCardConfig } from "./types/room-card-types";

console.info("ROOM-CARD-EDITOR: module loaded");

const hasIconPicker = () => !!customElements.get("ha-icon-picker");

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

  protected shouldUpdate(changed: PropertyValues): boolean {
    return changed.size > 0;
  }

  // ---- Helpers ----
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

  // ---- Render (ohne hass NIE leer!) ----
  protected render(): TemplateResult {
    if (!this._config) {
      // Minimaler Fallback, bis setConfig kommt
      return html`<div class="hint" style="padding:8px;opacity:.7">Loading editor…</div>`;
    }

    const c = this._config;
    const hasHass = !!this.hass;

    return html`
      <div class="form">
        <div class="section">
          <div class="section-title">Header</div>

          <ha-textfield
            .value=${c.title ?? ""}
            label="Title"
            @input=${(e: any) => this._set("title", e.currentTarget.value)}
          ></ha-textfield>

          <mwc-formfield label="Hide title">
            <mwc-switch
              .checked=${!!c.hide_title}
              @change=${(e: any) => this._set("hide_title", e.currentTarget.checked)}
            ></mwc-switch>
          </mwc-formfield>
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
                    ${hasHass
                      ? html`
                          <ha-entity-picker
                            .hass=${this.hass}
                            .value=${ent.entity ?? ""}
                            allow-custom-entity
                            label="Entity"
                            @value-changed=${(ev: any) => this._updateEntity(i, "entity", ev.detail.value)}
                          ></ha-entity-picker>
                        `
                      : html`
                          <ha-textfield
                            .value=${ent.entity ?? ""}
                            label="Entity (entity_id)"
                            @input=${(ev: any) => this._updateEntity(i, "entity", ev.currentTarget.value)}
                          ></ha-textfield>
                        `}

                    ${hasIconPicker()
                      ? html`
                          <ha-icon-picker
                            .value=${ent.icon ?? ""}
                            label="Icon"
                            @value-changed=${(ev: any) => this._updateEntity(i, "icon", ev.detail.value)}
                          ></ha-icon-picker>
                        `
                      : html`
                          <ha-textfield
                            .value=${ent.icon ?? ""}
                            label="Icon (mdi:…)"
                            @input=${(ev: any) => this._updateEntity(i, "icon", ev.currentTarget.value)}
                          ></ha-textfield>
                        `}

                    <mwc-formfield label="Show icon">
                      <mwc-switch
                        .checked=${ent.show_icon !== false}
                        @change=${(ev: any) => this._updateEntity(i, "show_icon", ev.currentTarget.checked)}
                      ></mwc-switch>
                    </mwc-formfield>

                    <mwc-button dense class="danger" @click=${() => this._removeEntity(i)}>Remove</mwc-button>
                  </div>
                `,
              )
            : html`<div class="hint">No entities yet. Click “Add entity”.</div>`}
        </div>

        <div class="section">
          <div class="section-title">Advanced</div>

          ${hasHass
            ? html`
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${c.entity ?? ""}
                  allow-custom-entity
                  label="Primary entity (optional)"
                  @value-changed=${(e: any) => this._set("entity", e.detail.value)}
                ></ha-entity-picker>
              `
            : html`
                <ha-textfield
                  .value=${c.entity ?? ""}
                  label="Primary entity (optional)"
                  @input=${(e: any) => this._set("entity", e.currentTarget.value)}
                ></ha-textfield>
              `}
        </div>
      </div>
    `;
  }

  static styles = css`
    .form { display: grid; gap: 16px; }
    .section { display: grid; gap: 12px; padding: 8px 0; border-top: 1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top: none; }
    .section-title { display: flex; align-items: center; justify-content: space-between; font-weight: 600; }
    .entity-row { display: grid; grid-template-columns: 1fr 180px auto auto; align-items: center; gap: 12px; }
    .hint { opacity: .7; font-style: italic; }
    mwc-button.danger { --mdc-theme-primary: var(--error-color, #d32f2f); }
  `;
}

// Doppelte Registrierung vermeiden
if (!customElements.get("room-card-editor")) {
  customElements.define("room-card-editor", RoomCardEditor);
}
export default RoomCardEditor;
