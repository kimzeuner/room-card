import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

/**
 * Visual Editor für room-card
 * - Deckt gängige Felder ab (Titel, Icon, entity, Alignment, show/hide title/icon)
 * - YAML-Block für erweiterte Optionen (entities, rows, cards, styles, templates, actions)
 */
@customElement("room-card-editor")
export class RoomCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: any = {};

  public setConfig(config: any): void {
    // Sicherheitskopie ohne potenziell große/zyklische Felder
    const { hass, entityIds, ...rest } = config || {};
    this._config = rest || {};
  }

  static get styles() {
    return css`
      .row { margin: 8px 0; display: grid; grid-template-columns: 160px 1fr; gap: 12px; align-items: center; }
      .toggle { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
      .help { color: var(--secondary-text-color); font-size: 12px; margin-top: 8px; }
      .yaml { margin-top: 16px; }
      ha-yaml-editor { --code-mirror-height: 240px; }
    `;
  }

  private _update(key: string, value: any) {
    const cfg = { ...this._config };
    if (value === "" || value === undefined) delete cfg[key];
    else cfg[key] = value;
    this._config = cfg;
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;

    return html`
      <div class="row">
        <div>Title</div>
        <ha-textfield
          .value=${this._config.title ?? ""}
          label="Title"
          @input=${(e: any) => this._update("title", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
      </div>

      <div class="row">
        <div>Icon</div>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._config.icon || ""}
          @value-changed=${(e: any) => this._update("icon", e.detail.value || undefined)}
        ></ha-icon-picker>
      </div>

      <div class="row">
        <div>Content alignment</div>
        <ha-select
          .value=${this._config.content_alignment ?? "left"}
          @value-changed=${(e: any) => this._update("content_alignment", e.detail?.value)}
          naturalMenuWidth
          fixedMenuPosition
          @closed=${(e: Event) => e.stopPropagation()}
        >
          <mwc-list-item value="left">Left</mwc-list-item>
          <mwc-list-item value="center">Center</mwc-list-item>
          <mwc-list-item value="right">Right</mwc-list-item>
        </ha-select>
      </div>

      <div class="row">
        <div>Primary entity</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.entity || ""}
          @value-changed=${(e: any) => this._update("entity", e.detail.value || undefined)}
          allow-custom-entity
        ></ha-entity-picker>
      </div>

      <div class="toggle">
        <ha-switch
          .checked=${!!this._config.show_icon}
          @change=${(e: any) => this._update("show_icon", e.target.checked)}
        ></ha-switch>
        <span>Show icon</span>
      </div>

      <div class="toggle">
        <ha-switch
          .checked=${!!this._config.hide_title}
          @change=${(e: any) => this._update("hide_title", e.target.checked)}
        ></ha-switch>
        <span>Hide title</span>
      </div>

      <div class="help">
        Erweiterte Einstellungen (entities, rows, cards, styles, templates, actions) unten im YAML-Block bearbeiten.
      </div>

      <div class="yaml">
        <ha-yaml-editor
          .label=${"Advanced configuration"}
          .defaultValue=${this._config}
          @value-changed=${(e: any) => {
            const v = e.detail?.value;
            if (v && typeof v === "object") {
              // sicherstellen, dass hass/entityIds nicht reinrutschen
              const { hass, entityIds, ...rest } = v;
              this._config = rest;
              this._emit();
            }
          }}
        ></ha-yaml-editor>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "room-card-editor": RoomCardEditor;
  }
}
