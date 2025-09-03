import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

type AnyObj = Record<string, any>;

@customElement("room-card-editor")
export class RoomCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config: AnyObj = {};
  @state() private _entities: AnyObj[] = [];

  public setConfig(config: AnyObj): void {
    // sanitize (keine großen/zyklischen Felder)
    const { hass, entityIds, ...rest } = config || {};
    this._config = rest || {};
    this._entities = Array.isArray(this._config.entities) ? [...this._config.entities] : [];
  }

  static get styles() {
    return css`
      .row { margin: 8px 0; display: grid; grid-template-columns: 160px 1fr; gap: 12px; align-items: center; }
      .toggle { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
      .help { color: var(--secondary-text-color); font-size: 12px; margin-top: 8px; }
      .yaml { margin-top: 16px; }
      ha-yaml-editor { --code-mirror-height: 240px; }
      ha-textfield { width: 100%; }
      .section { margin-top: 16px; font-weight: 600; }
      .entity-card { border: 1px solid var(--divider-color); border-radius: 8px; padding: 12px; margin: 8px 0; display: grid; gap: 8px; }
      .entity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .entity-actions { display: flex; gap: 8px; justify-content: space-between; align-items: center; }
      .entity-switches { display: grid; grid-template-columns: repeat(4, minmax(0, max-content)); gap: 12px; align-items: center; }
      .divider { height: 1px; background: var(--divider-color); margin: 8px 0; }
      .muted { color: var(--secondary-text-color); font-size: 12px; }
      .actions-row { display: grid; grid-template-columns: 1fr; gap: 8px; }
      .chips { display:flex; gap: 6px; flex-wrap: wrap; }
    `;
  }

  // ---------- helpers ----------
  private _emit() {
    const cfg = { ...this._config, entities: this._entities };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg } }));
  }
  private _updateCfg(key: string, value: any) {
    const cfg = { ...this._config };
    if (value === "" || value === undefined) delete cfg[key];
    else cfg[key] = value;
    this._config = cfg;
    this._emit();
  }
  private _updateEntity(i: number, key: string, value: any) {
    const list = [...this._entities];
    const e = { ...(list[i] || {}) };
    if (value === "" || value === undefined) delete e[key]; else e[key] = value;
    list[i] = e;
    this._entities = list;
    this._emit();
  }
  private _addEntity() {
    this._entities = [...this._entities, { entity: "" }];
    this._emit();
  }
  private _removeEntity(i: number) {
    const list = [...this._entities];
    list.splice(i, 1);
    this._entities = list;
    this._emit();
  }
  private _moveEntity(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= this._entities.length) return;
    const list = [...this._entities];
    const [item] = list.splice(i, 1);
    list.splice(j, 0, item);
    this._entities = list;
    this._emit();
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;

    // ACTION-EDITOR vorhanden?
    const ActionEditorTag = (customElements.get("hui-action-editor") ? "hui-action-editor" : null) as any;

    return html`
      <!-- Basiseinstellungen -->
      <div class="row">
        <div>Title</div>
        <ha-textfield
          .value=${this._config.title ?? ""}
          label="Title"
          @input=${(e: any) => this._updateCfg("title", (e.target as HTMLInputElement).value || undefined)}
        ></ha-textfield>
      </div>

      <div class="row">
        <div>Icon</div>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._config.icon || ""}
          @value-changed=${(e: any) => this._updateCfg("icon", e.detail.value || undefined)}
        ></ha-icon-picker>
      </div>

      <div class="row">
        <div>Content alignment</div>
        <ha-select
          .value=${this._config.content_alignment ?? "left"}
          @value-changed=${(e: any) => this._updateCfg("content_alignment", e.detail?.value)}
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
          @value-changed=${(e: any) => this._updateCfg("entity", e.detail.value || undefined)}
          allow-custom-entity
        ></ha-entity-picker>
      </div>

      <div class="toggle">
        <ha-switch
          .checked=${!!this._config.show_icon}
          @change=${(e: any) => this._updateCfg("show_icon", e.target.checked)}
        ></ha-switch>
        <span>Show icon</span>
      </div>

      <div class="toggle">
        <ha-switch
          .checked=${!!this._config.hide_title}
          @change=${(e: any) => this._updateCfg("hide_title", e.target.checked)}
        ></ha-switch>
        <span>Hide title</span>
      </div>

      <!-- Entities Editor -->
      <div class="section">Entities</div>
      <div class="muted">Bearbeite hier die häufigsten Felder. Für alles weitere nutze den YAML-Block.</div>
      ${this._entities.map((ent, i) => html`
        <div class="entity-card">
          <div class="entity-grid">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${ent.entity || ""}
              label="entity"
              allow-custom-entity
              @value-changed=${(e: any) => this._updateEntity(i, "entity", e.detail.value || undefined)}
            ></ha-entity-picker>

            <ha-textfield
              .value=${ent.name ?? ""}
              label="name"
              @input=${(e: any) => this._updateEntity(i, "name", (e.target as HTMLInputElement).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.attribute ?? ""}
              label="attribute"
              @input=${(e: any) => this._updateEntity(i, "attribute", (e.target as HTMLInputElement).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.unit ?? ""}
              label="unit"
              @input=${(e: any) => this._updateEntity(i, "unit", (e.target as HTMLInputElement).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.icon ?? ""}
              label="icon"
              @input=${(e: any) => this._updateEntity(i, "icon", (e.target as HTMLInputElement).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.format ?? ""}
              label="format"
              @input=${(e: any) => this._updateEntity(i, "format", (e.target as HTMLInputElement).value || undefined)}
            ></ha-textfield>
          </div>

          <div class="entity-switches">
            <span class="chips">
              <ha-switch
                .checked=${!!ent.show_name}
                @change=${(e: any) => this._updateEntity(i, "show_name", e.target.checked)}
              ></ha-switch><span>show_name</span>
            </span>
            <span class="chips">
              <ha-switch
                .checked=${!!ent.show_icon}
                @change=${(e: any) => this._updateEntity(i, "show_icon", e.target.checked)}
              ></ha-switch><span>show_icon</span>
            </span>
            <span class="chips">
              <ha-switch
                .checked=${!!ent.state_color}
                @change=${(e: any) => this._updateEntity(i, "state_color", e.target.checked)}
              ></ha-switch><span>state_color</span>
            </span>
            <span class="chips">
              <ha-switch
                .checked=${!!ent.toggle}
                @change=${(e: any) => this._updateEntity(i, "toggle", e.target.checked)}
              ></ha-switch><span>toggle</span>
            </span>
          </div>

          <div class="entity-actions">
            <div>
              <mwc-button dense @click=${() => this._moveEntity(i, -1)} ?disabled=${i===0}>▲</mwc-button>
              <mwc-button dense @click=${() => this._moveEntity(i, +1)} ?disabled=${i===this._entities.length-1}>▼</mwc-button>
            </div>
            <mwc-button dense danger @click=${() => this._removeEntity(i)}>Remove</mwc-button>
          </div>

          <!-- Actions je Entity (nur wenn hui-action-editor verfügbar) -->
          ${ActionEditorTag ? html`
            <div class="actions-row">
              <span class="muted">Actions</span>
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.tap_action || {}}
                .label=${"tap_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "tap_action", e.detail?.value || undefined)}
              ></hui-action-editor>
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.hold_action || {}}
                .label=${"hold_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "hold_action", e.detail?.value || undefined)}
              ></hui-action-editor>
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.double_tap_action || {}}
                .label=${"double_tap_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "double_tap_action", e.detail?.value || undefined)}
              ></hui-action-editor>
            </div>
          ` : html`
            <div class="muted">Hinweis: Kein <code>hui-action-editor</code> gefunden – Actions bitte im YAML-Block unten bearbeiten.</div>
          `}
        </div>
      `)}

      <mwc-button raised @click=${this._addEntity}>Add entity</mwc-button>

      <!-- Advanced YAML -->
      <div class="yaml">
        <ha-yaml-editor
          .label=${"Advanced configuration (entities, rows, cards, styles, templates...)"}
          .defaultValue=${{ ...this._config, entities: this._entities }}
          @value-changed=${(e: any) => {
            const v = e.detail?.value;
            if (v && typeof v === "object") {
              const { hass, entityIds, ...rest } = v;
              this._config = rest || {};
              this._entities = Array.isArray(this._config.entities) ? [...this._config.entities] : [];
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
