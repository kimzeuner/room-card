import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { RoomCardConfig } from "./types/room-card-types";

console.info("ROOM-CARD-EDITOR: module loaded");

// Verfügbarkeits-Checks (verschiedene HA-Versionen)
const has = {
  textfield: () => !!customElements.get("ha-textfield"),
  entityPicker: () => !!customElements.get("ha-entity-picker"),
  iconPicker: () => !!customElements.get("ha-icon-picker"),
  mwcSwitch: () => !!customElements.get("mwc-switch"),
  mwcButton: () => !!customElements.get("mwc-button"),
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
    // defensive copy + defaults
    const safeRows =
      Array.isArray((config as any).rows)
        ? (config as any).rows.map((r: any) => ({
            ...r,
            entities: Array.isArray(r?.entities) ? [...r.entities] : [],
          }))
        : [];
    const safeEntities = Array.isArray((config as any).entities) ? [...(config as any).entities] : [];

    this._config = {
      ...(config || ({} as any)),
      rows: safeRows,
      entities: safeEntities,
    } as RoomCardConfig;

    this.requestUpdate();
  }

  // ---------- helpers ----------
  private _emitChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  private _set<K extends keyof RoomCardConfig>(key: K, value: RoomCardConfig[K]) {
    this._config = { ...(this._config || ({} as any)), [key]: value } as RoomCardConfig;
    this._emitChanged();
  }

  private _ensureRows() {
    if (!this._config) return;
    if (!Array.isArray((this._config as any).rows)) {
      (this._config as any).rows = [];
    }
  }
  private _ensureTopEntities() {
    if (!this._config) return;
    if (!Array.isArray((this._config as any).entities)) {
      (this._config as any).entities = [];
    }
  }

  // ----- rows -----
  private _addRow = () => {
    if (!this._config) return;
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    rows.push({ entities: [] });
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _removeRow = (rowIndex: number) => {
    if (!this._config) return;
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    rows.splice(rowIndex, 1);
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _addRowEntity = (rowIndex: number) => {
    if (!this._config) return;
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [ ...row.entities ] : [];
    row.entities.push({ entity: "", name: "", show_icon: true, show_state: true });
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _removeRowEntity = (rowIndex: number, entIndex: number) => {
    if (!this._config) return;
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [ ...row.entities ] : [];
    row.entities.splice(entIndex, 1);
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _updateRowEntity = (rowIndex: number, entIndex: number, key: string, value: any) => {
    if (!this._config) return;
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [ ...row.entities ] : [];
    const ent = { ...(row.entities[entIndex] || {}) };
    (ent as any)[key] = value;
    row.entities[entIndex] = ent;
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  // ----- top-level entities (backwards compatibility) -----
  private _addEntity = () => {
    if (!this._config) return;
    this._ensureTopEntities();
    const entities = [ ...(this._config as any).entities ];
    entities.push({ entity: "", name: "", show_icon: true, show_state: true });
    (this._config as any).entities = entities;
    this._emitChanged();
  };

  private _removeEntity = (index: number) => {
    if (!this._config) return;
    this._ensureTopEntities();
    const entities = [ ...(this._config as any).entities ];
    entities.splice(index, 1);
    (this._config as any).entities = entities;
    this._emitChanged();
  };

  private _updateEntity = (index: number, key: string, value: any) => {
    if (!this._config) return;
    this._ensureTopEntities();
    const entities = [ ...(this._config as any).entities ];
    const ent = { ...(entities[index] || {}) };
    (ent as any)[key] = value;
    entities[index] = ent;
    (this._config as any).entities = entities;
    this._emitChanged();
  };

  // ---------- UI-Bausteine mit Fallback ----------
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

  private _Btn(label: string, onClick: () => void, kind: "primary" | "danger" | "ghost" = "primary") {
    return has.mwcButton()
      ? html`<mwc-button dense class=${kind} @click=${onClick}>${label}</mwc-button>`
      : html`<button class="plain-btn ${kind}" @click=${onClick}>${label}</button>`;
  }

  // ---------- render ----------
  protected render(): TemplateResult {
    if (!this._config) {
      return html`<div class="hint">Loading editor…</div>`;
    }
    const c: any = this._config;

    return html`
      <div class="form">
        <!-- Header -->
        <div class="section">
          <div class="section-title">Header</div>
          ${this._TF("Title", c.title ?? "", (v) => this._set("title", v))}
          ${this._Switch("Hide title", !!c.hide_title, (v) => this._set("hide_title", v))}
        </div>

        <!-- Rows -->
        <div class="section">
          <div class="section-title">
            Rows
            ${this._Btn("Add row", this._addRow)}
          </div>

          ${(c.rows ?? []).length
            ? c.rows.map(
                (row: any, ri: number) => html`
                  <div class="row-card">
                    <div class="row-header">
                      <div class="row-title">Row ${ri + 1}</div>
                      <div class="row-actions">
                        ${this._Btn("Add entity", () => this._addRowEntity(ri), "ghost")}
                        ${this._Btn("Remove row", () => this._removeRow(ri), "danger")}
                      </div>
                    </div>

                    ${Array.isArray(row.entities) && row.entities.length
                      ? row.entities.map(
                          (ent: any, ei: number) => html`
                            <div class="entity-row">
                              ${this._EntityPicker("Entity", ent.entity ?? "", (v) =>
                                this._updateRowEntity(ri, ei, "entity", v),
                              )}

                              ${this._TF("Name (optional)", ent.name ?? "", (v) =>
                                this._updateRowEntity(ri, ei, "name", v),
                              )}

                              ${this._IconPicker(ent.icon ?? "", (v) =>
                                this._updateRowEntity(ri, ei, "icon", v),
                              )}

                              ${this._Switch(
                                "Show icon",
                                ent.show_icon !== false,
                                (v) => this._updateRowEntity(ri, ei, "show_icon", v),
                              )}

                              ${this._Switch(
                                "Show state",
                                ent.show_state !== false,
                                (v) => this._updateRowEntity(ri, ei, "show_state", v),
                              )}

                              ${this._Btn("Remove", () => this._removeRowEntity(ri, ei), "danger")}
                            </div>
                          `,
                        )
                      : html`<div class="hint">No entities in this row yet.</div>`}
                  </div>
                `,
              )
            : html`<div class="hint">No rows yet. Click “Add row”.</div>`}
        </div>

        <!-- Top-level Entities (Backward compatibility) -->
        <div class="section">
          <div class="section-title">
            Entities (top level)
            ${this._Btn("Add entity", this._addEntity)}
          </div>

          ${Array.isArray(c.entities) && c.entities.length
            ? c.entities.map(
                (ent: any, i: number) => html`
                  <div class="entity-row">
                    ${this._EntityPicker("Entity", ent.entity ?? "", (v) => this._updateEntity(i, "entity", v))}
                    ${this._TF("Name (optional)", ent.name ?? "", (v) => this._updateEntity(i, "name", v))}
                    ${this._IconPicker(ent.icon ?? "", (v) => this._updateEntity(i, "icon", v))}
                    ${this._Switch(
                      "Show icon",
                      ent.show_icon !== false,
                      (v) => this._updateEntity(i, "show_icon", v),
                    )}
                    ${this._Switch(
                      "Show state",
                      ent.show_state !== false,
                      (v) => this._updateEntity(i, "show_state", v),
                    )}
                    ${this._Btn("Remove", () => this._removeEntity(i), "danger")}
                  </div>
                `,
              )
            : html`<div class="hint">No top-level entities. Prefer using Rows above.</div>`}
        </div>

        <!-- Advanced -->
        <div class="section">
          <div class="section-title">Advanced</div>
          ${this._EntityPicker(
            "Primary entity (optional)",
            c.entity ?? "",
            (v) => this._set("entity", v),
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display:block; box-sizing:border-box; padding:4px 0 8px; }
    .form { display:grid; gap:16px; }
    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; font-weight:600; }
    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; }
    .row-title { font-weight:600; }
    .row-actions { display:flex; gap:8px; }
    .entity-row { display:grid; grid-template-columns: 1fr 200px 160px auto auto auto; gap:12px; align-items:center; }
    .hint { opacity:.7; font-style:italic; }
    .lbl { display:grid; gap:6px; font-size:.9rem; }
    input.plain { padding:8px; border:1px solid var(--divider-color, #ddd); border-radius:6px; background:var(--card-background-color, #fff); color:var(--primary-text-color); }
    .plain-btn { padding:6px 10px; border-radius:8px; border:1px solid var(--divider-color,#ccc); background: var(--secondary-background-color,#f6f6f6); cursor:pointer; }
    .plain-btn.primary {}
    .plain-btn.ghost { background:transparent; }
    .plain-btn.danger { border-color: var(--error-color,#d32f2f); color: var(--error-color,#d32f2f); }
    mwc-button.danger { --mdc-theme-primary: var(--error-color, #d32f2f); }
  `;
}

// doppelte Registrierung vermeiden
if (!customElements.get("room-card-editor")) {
  customElements.define("room-card-editor", RoomCardEditor);
}
export default RoomCardEditor;
