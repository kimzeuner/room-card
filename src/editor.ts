import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

type AnyObj = Record<string, any>;
type Condition = { entity?: string; attribute?: string; operator?: string; value?: any };

const uid = () => `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;

@customElement("room-card-editor")
export class RoomCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config: AnyObj = {};
  @state() private _entities: AnyObj[] = [];
  @state() private _rows: { _id: string; label?: string; entities: AnyObj[] }[] = [];
  @state() private _hideIf: Condition[] = [];
  @state() private _styles: AnyObj = {};

  public setConfig(config: AnyObj): void {
    const { hass, entityIds, ...rest } = config || {};
    this._config  = rest || {};
    // Entities (keyed for stable rendering)
    const ents = Array.isArray(this._config.entities) ? [...this._config.entities] : [];
    this._entities = ents.map((e: AnyObj) => ({ _id: uid(), ...(e ?? {}) }));
    // Rows
    const rows = Array.isArray(this._config.rows) ? [...this._config.rows] : [];
    this._rows = rows.map((r: AnyObj) => ({
      _id: uid(),
      label: r?.label ?? r?.name ?? "",
      entities: Array.isArray(r?.entities) ? r.entities.map((e: AnyObj) => ({ _id: uid(), ...(e ?? {}) })) : []
    }));
    // Conditions (root-level hide_if)
    this._hideIf = Array.isArray(this._config.hide_if) ? [...this._config.hide_if] : [];
    // Styles
    this._styles = this._config.styles && typeof this._config.styles === "object" ? { ...this._config.styles } : {};
  }

  static get styles() {
    return css`
      .row { margin: 8px 0; display: grid; grid-template-columns: 160px 1fr; gap: 12px; align-items: center; }
      .toggle { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
      .help { color: var(--secondary-text-color); font-size: 12px; margin: 8px 0 0; }
      .yaml { margin-top: 16px; }
      ha-yaml-editor { --code-mirror-height: 240px; }
      ha-textfield { width: 100%; }
      .section { margin-top: 18px; font-weight: 600; }
      .muted { color: var(--secondary-text-color); font-size: 12px; }
      .card { border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; margin: 10px 0; }
      .entity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .entity-actions { display: flex; gap: 8px; justify-content: space-between; align-items: center; margin-top: 8px; }
      .entity-switches { display: grid; grid-template-columns: repeat(4, minmax(0, max-content)); gap: 12px; align-items: center; margin-top: 6px; }
      .mini { display:flex; align-items:center; gap:10px; }
      .chips { display:flex; gap: 6px; flex-wrap: wrap; }
      ha-state-icon { --mdc-icon-size: 22px; }
      .grid-3 { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; }
      .cond-row { display:grid; grid-template-columns: 1fr 110px 1fr 1fr auto; gap:8px; align-items:center; }
      .row-title { font-weight: 600; margin-bottom: 8px; }
      .subtle { opacity: .8 }
      .mb8 { margin-bottom: 8px; }
    `;
  }

  // ---------- emit ----------
  private _emit() {
    const cfg: AnyObj = { ...this._config };
    cfg.entities = this._entities.map(({ _id, ...rest }) => rest);
    cfg.rows = this._rows.map(({ _id, label, entities }) => ({
      label,
      entities: entities.map(({ _id, ...r }) => r)
    }));
    cfg.hide_if = this._hideIf.length ? this._hideIf : undefined;
    cfg.styles = Object.keys(this._styles||{}).length ? this._styles : undefined;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: cfg } }));
  }

  // ---------- config helpers ----------
  private _updateCfg(key: string, value: any) {
    const cfg = { ...this._config };
    if (value === "" || value === undefined) delete cfg[key];
    else cfg[key] = value;
    this._config = cfg;
    this._emit();
  }

  // ---------- entity list helpers ----------
  private _addEntity() {
    this._entities = [...this._entities, { _id: uid(), entity: "" }];
    this.updateComplete.then(() => this._emit());
  }
  private _removeEntity(i: number) {
    const list = [...this._entities]; list.splice(i, 1);
    this._entities = list; this._emit();
  }
  private _moveEntity(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= this._entities.length) return;
    const list = [...this._entities]; const [it] = list.splice(i, 1); list.splice(j, 0, it);
    this._entities = list; this._emit();
  }
  private _updateEntity(i: number, key: string, value: any) {
    const list = [...this._entities];
    const e = { ...(list[i] || {}) };
    if (value === "" || value === undefined) delete e[key]; else e[key] = value;
    list[i] = e; this._entities = list; this._emit();
  }

  // live icon logic similar to header: prefer explicit icon, else ha-state-icon from entity
  private _entityIconPreview(ent: AnyObj) {
    if (!ent?.show_icon) return html``;
    const st = ent?.entity ? this.hass?.states?.[ent.entity] : undefined;
    // explicit icon wins
    if (ent?.icon) return html`<ha-state-icon .icon=${ent.icon}></ha-state-icon>`;
    if (st) return html`<ha-state-icon .stateObj=${st}></ha-state-icon>`;
    return html``;
  }

  // ---------- rows helpers ----------
  private _addRow() {
    this._rows = [...this._rows, { _id: uid(), label: "", entities: [] }];
    this._emit();
  }
  private _removeRow(i: number) {
    const rows = [...this._rows]; rows.splice(i, 1);
    this._rows = rows; this._emit();
  }
  private _moveRow(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= this._rows.length) return;
    const arr = [...this._rows]; const [r] = arr.splice(i, 1); arr.splice(j, 0, r);
    this._rows = arr; this._emit();
  }
  private _updateRowLabel(i: number, v: string) {
    const arr = [...this._rows]; arr[i] = { ...arr[i], label: v || undefined };
    this._rows = arr; this._emit();
  }
  private _addRowEntity(i: number) {
    const arr = [...this._rows];
    const row = { ...(arr[i] || {}) };
    row.entities = [...(row.entities || []), { _id: uid(), entity: "" }];
    arr[i] = row; this._rows = arr; this._emit();
  }
  private _updateRowEntity(i: number, j: number, key: string, value: any) {
    const arr = [...this._rows]; const row = { ...(arr[i] || {}) };
    const ents = [...(row.entities || [])];
    const e = { ...(ents[j] || {}) };
    if (value === "" || value === undefined) delete e[key]; else e[key] = value;
    ents[j] = e; row.entities = ents; arr[i] = row; this._rows = arr; this._emit();
  }
  private _removeRowEntity(i: number, j: number) {
    const arr = [...this._rows]; const row = { ...(arr[i] || {}) };
    const ents = [...(row.entities || [])]; ents.splice(j, 1);
    row.entities = ents; arr[i] = row; this._rows = arr; this._emit();
  }
  private _moveRowEntity(i: number, j: number, dir: -1 | 1) {
    const arr = [...this._rows]; const row = { ...(arr[i] || {}) };
    const ents = [...(row.entities || [])];
    const k = j + dir; if (k < 0 || k >= ents.length) return;
    const [item] = ents.splice(j, 1); ents.splice(k, 0, item);
    row.entities = ents; arr[i] = row; this._rows = arr; this._emit();
  }

  // ---------- conditions ----------
  private _addCondition() { this._hideIf = [...this._hideIf, { entity: "", operator: "==", value: "off" }]; this._emit(); }
  private _updateCond(i: number, key: keyof Condition, value: any) {
    const list = [...this._hideIf]; const c = { ...(list[i] || {}) } as Condition;
    if (value === "" || value === undefined) delete (c as any)[key]; else (c as any)[key] = value;
    list[i] = c; this._hideIf = list; this._emit();
  }
  private _removeCond(i: number) { const l = [...this._hideIf]; l.splice(i, 1); this._hideIf = l; this._emit(); }

  // ---------- styles ----------
  private _updateStyle(key: string, value: any) {
    const s = { ...(this._styles || {}) };
    if (value === "" || value === undefined) delete s[key]; else s[key] = value;
    this._styles = s; this._emit();
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;

    const ActionEditorAvailable = !!customElements.get("hui-action-editor");

    return html`
      <!-- Basis -->
      <div class="row">
        <div>Title</div>
        <ha-textfield
          .value=${this._config.title ?? ""}
          label="Title"
          @input=${(e: any) => this._updateCfg("title", (e.target as any).value || undefined)}
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
          @closed=${(e: any) => e.stopPropagation()}
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
          @closed=${(e: any) => e.stopPropagation()}
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

      <!-- Entities -->
      <div class="section">Entities</div>
      <div class="muted">Live-Vorschau: Icon wie im Header – explizites <code>icon</code> überschreibt das Standard-Icon der Entity.</div>

      ${repeat(this._entities, (e) => e._id, (ent, i) => html`
        <div class="card">
          <div class="mini">
            ${this._entityIconPreview(ent)}
            <span class="muted subtle">${ent.entity || "—"}</span>
          </div>

          <div class="entity-grid">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${ent.entity || ""}
              label="entity"
              allow-custom-entity
              @value-changed=${(e: any) => this._updateEntity(i, "entity", e.detail.value || undefined)}
              @closed=${(e: any) => e.stopPropagation()}
            ></ha-entity-picker>

            <ha-textfield
              .value=${ent.name ?? ""}
              label="name"
              @input=${(e: any) => this._updateEntity(i, "name", (e.target as any).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.attribute ?? ""}
              label="attribute"
              @input=${(e: any) => this._updateEntity(i, "attribute", (e.target as any).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.unit ?? ""}
              label="unit"
              @input=${(e: any) => this._updateEntity(i, "unit", (e.target as any).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.icon ?? ""}
              label="icon (z. B. mdi:sun)"
              @input=${(e: any) => this._updateEntity(i, "icon", (e.target as any).value || undefined)}
            ></ha-textfield>

            <ha-textfield
              .value=${ent.format ?? ""}
              label="format"
              @input=${(e: any) => this._updateEntity(i, "format", (e.target as any).value || undefined)}
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

          ${ActionEditorAvailable ? html`
            <div class="section">Actions</div>
            <div class="mb8">
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.tap_action || {}}
                .label=${"tap_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "tap_action", e.detail?.value || undefined)}
              ></hui-action-editor>
            </div>
            <div class="mb8">
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.hold_action || {}}
                .label=${"hold_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "hold_action", e.detail?.value || undefined)}
              ></hui-action-editor>
            </div>
            <div class="mb8">
              <hui-action-editor
                .hass=${this.hass}
                .config=${ent.double_tap_action || {}}
                .label=${"double_tap_action"}
                @value-changed=${(e: any) => this._updateEntity(i, "double_tap_action", e.detail?.value || undefined)}
              ></hui-action-editor>
            </div>
          ` : html`<div class="muted">Kein <code>hui-action-editor</code> gefunden – Actions im YAML unten pflegen.</div>`}

          <div class="entity-actions">
            <div>
              <mwc-button dense @click=${() => this._moveEntity(i, -1)} ?disabled=${i===0}>▲</mwc-button>
              <mwc-button dense @click=${() => this._moveEntity(i, +1)} ?disabled=${i===this._entities.length-1}>▼</mwc-button>
            </div>
            <mwc-button dense danger @click=${() => this._removeEntity(i)}>Remove</mwc-button>
          </div>
        </div>
      `)}

      <mwc-button raised @click=${this._addEntity}>Add entity</mwc-button>

      <!-- Rows -->
      <div class="section">Rows</div>
      ${repeat(this._rows, r => r._id, (row, i) => html`
        <div class="card">
          <div class="row-title">Row ${i+1}</div>
          <div class="row">
            <div>Label</div>
            <ha-textfield
              .value=${row.label ?? ""}
              label="label"
              @input=${(e: any) => this._updateRowLabel(i, (e.target as any).value || "")}
            ></ha-textfield>
          </div>

          ${repeat(row.entities, e => e._id, (cell, j) => html`
            <div class="card subtle">
              <div class="mini">
                ${cell.show_icon ? html`
                  ${cell.icon ? html`<ha-state-icon .icon=${cell.icon}></ha-state-icon>`
                              : html`${cell.entity ? html`<ha-state-icon .stateObj=${this.hass?.states?.[cell.entity]}></ha-state-icon>` : html``}`}
                ` : html``}
                <span class="muted">${cell.entity || "—"}</span>
              </div>
              <div class="entity-grid">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${cell.entity || ""}
                  label="entity"
                  allow-custom-entity
                  @value-changed=${(e: any) => this._updateRowEntity(i, j, "entity", e.detail.value || undefined)}
                  @closed=${(e: any) => e.stopPropagation()}
                ></ha-entity-picker>
                <ha-textfield
                  .value=${cell.name ?? ""}
                  label="name"
                  @input=${(e: any) => this._updateRowEntity(i, j, "name", (e.target as any).value || undefined)}
                ></ha-textfield>
                <ha-textfield
                  .value=${cell.icon ?? ""}
                  label="icon"
                  @input=${(e: any) => this._updateRowEntity(i, j, "icon", (e.target as any).value || undefined)}
                ></ha-textfield>
                <ha-textfield
                  .value=${cell.unit ?? ""}
                  label="unit"
                  @input=${(e: any) => this._updateRowEntity(i, j, "unit", (e.target as any).value || undefined)}
                ></ha-textfield>
              </div>
              <div class="entity-switches">
                <span class="chips">
                  <ha-switch
                    .checked=${!!cell.show_name}
                    @change=${(e: any) => this._updateRowEntity(i, j, "show_name", e.target.checked)}
                  ></ha-switch><span>show_name</span>
                </span>
                <span class="chips">
                  <ha-switch
                    .checked=${!!cell.show_icon}
                    @change=${(e: any) => this._updateRowEntity(i, j, "show_icon", e.target.checked)}
                  ></ha-switch><span>show_icon</span>
                </span>
              </div>
              <div class="entity-actions">
                <div>
                  <mwc-button dense @click=${() => this._moveRowEntity(i, j, -1)} ?disabled=${j===0}>▲</mwc-button>
                  <mwc-button dense @click=${() => this._moveRowEntity(i, j, +1)} ?disabled=${j===row.entities.length-1}>▼</mwc-button>
                </div>
                <mwc-button dense danger @click=${() => this._removeRowEntity(i, j)}>Remove</mwc-button>
              </div>
            </div>
          `)}

          <mwc-button dense @click=${() => this._addRowEntity(i)}>Add row entity</mwc-button>

          <div class="entity-actions" style="margin-top:12px">
            <div>
              <mwc-button dense @click=${() => this._moveRow(i, -1)} ?disabled=${i===0}>Row ▲</mwc-button>
              <mwc-button dense @click=${() => this._moveRow(i, +1)} ?disabled=${i===this._rows.length-1}>Row ▼</mwc-button>
            </div>
            <mwc-button dense danger @click=${() => this._removeRow(i)}>Remove row</mwc-button>
          </div>
        </div>
      `)}
      <mwc-button raised @click=${this._addRow}>Add row</mwc-button>

      <!-- Conditional Visibility -->
      <div class="section">Conditional visibility (hide_if)</div>
      <div class="muted">Einfache Bedingungen; für komplexere Fälle nutze unten den YAML-Block.</div>
      ${this._hideIf.map((c, i) => html`
        <div class="cond-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${c.entity || ""}
            allow-custom-entity
            @value-changed=${(e: any) => this._updateCond(i, "entity", e.detail.value || undefined)}
            @closed=${(e: any) => e.stopPropagation()}
          ></ha-entity-picker>
          <ha-select
            .value=${c.operator ?? "=="}
            @value-changed=${(e: any) => this._updateCond(i, "operator", e.detail?.value)}
            naturalMenuWidth fixedMenuPosition
            @closed=${(e: any) => e.stopPropagation()}
          >
            <mwc-list-item value="==">==</mwc-list-item>
            <mwc-list-item value="!=">!=</mwc-list-item>
            <mwc-list-item value="<"><</mwc-list-item>
            <mwc-list-item value=">">></mwc-list-item>
            <mwc-list-item value="<="><=</mwc-list-item>
            <mwc-list-item value=">=">>=</mwc-list-item>
            <mwc-list-item value="contains">contains</mwc-list-item>
          </ha-select>
          <ha-textfield
            .value=${c.attribute ?? ""}
            label="attribute (optional)"
            @input=${(e: any) => this._updateCond(i, "attribute", (e.target as any).value || undefined)}
          ></ha-textfield>
          <ha-textfield
            .value=${c.value ?? ""}
            label="value"
            @input=${(e: any) => this._updateCond(i, "value", (e.target as any).value)}
          ></ha-textfield>
          <mwc-button dense danger @click=${() => this._removeCond(i)}>Remove</mwc-button>
        </div>
      `)}
      <mwc-button dense @click=${this._addCondition}>Add condition</mwc-button>

      <!-- Styles helper -->
      <div class="section">Styles</div>
      <div class="grid-3">
        <ha-textfield
          .value=${this._styles?.title_color ?? ""}
          label="title_color (CSS)"
          @input=${(e: any) => this._updateStyle("title_color", (e.target as any).value || undefined)}
        ></ha-textfield>
        <ha-textfield
          .value=${this._styles?.icon_color ?? ""}
          label="icon_color (CSS)"
          @input=${(e: any) => this._updateStyle("icon_color", (e.target as any).value || undefined)}
        ></ha-textfield>
        <ha-textfield
          .value=${this._styles?.font_size ?? ""}
          label="font_size (CSS)"
          @input=${(e: any) => this._updateStyle("font_size", (e.target as any).value || undefined)}
        ></ha-textfield>
      </div>
      <div class="help">Weitere Styles unten im YAML-Block ergänzen/feintunen.</div>

      <!-- Advanced YAML -->
      <div class="yaml">
        <ha-yaml-editor
          .label=${"Advanced configuration (entities, rows, cards, styles, templates...)"}
          .defaultValue=${{
            ...this._config,
            entities: this._entities.map(({_id, ...r}) => r),
            rows: this._rows.map(({_id, label, entities}) => ({ label, entities: entities.map(({_id, ...r}) => r) })),
            hide_if: this._hideIf.length ? this._hideIf : undefined,
            styles: Object.keys(this._styles||{}).length ? this._styles : undefined
          }}
          @value-changed=${(e: any) => {
            const v = e.detail?.value;
            if (v && typeof v === "object") {
              const { hass, entityIds, entities, rows, hide_if, styles, ...rest } = v;
              this._config = rest || {};
              this._entities = Array.isArray(entities) ? entities.map((x:any)=>({_id:uid(), ...x})) : [];
              this._rows = Array.isArray(rows) ? rows.map((r:any)=>({_id:uid(), label:r?.label ?? r?.name ?? "", entities:Array.isArray(r?.entities)? r.entities.map((x:any)=>({_id:uid(), ...x})) : []})) : [];
              this._hideIf = Array.isArray(hide_if) ? [...hide_if] : [];
              this._styles = styles && typeof styles === "object" ? { ...styles } : {};
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
