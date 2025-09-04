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
  haSwitch: () => !!customElements.get("ha-switch"),
  haFormfield: () => !!customElements.get("ha-formfield"),
  mwcSwitch: () => !!customElements.get("mwc-switch"),
  mwcFormfield: () => !!customElements.get("mwc-formfield"),
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

    const safeRows =
      Array.isArray((config as any).rows)
        ? (config as any).rows.map((r: any) => ({
            ...r,
            entities: Array.isArray(r?.entities) ? [...r.entities] : [],
          }))
        : [];

    const safeInfo =
      Array.isArray((config as any).info_entities)
        ? (config as any).info_entities.map((e: any) => ({ ...e }))
        : [];

    this._config = {
      ...(config as any),
      rows: safeRows,
      info_entities: safeInfo,
    } as RoomCardConfig;

    this.requestUpdate();
  }

  // ---------- helpers ----------
  private _emitChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }
  private _set<K extends keyof RoomCardConfig>(key: K, value: RoomCardConfig[K]) {
    this._config = { ...(this._config as any), [key]: value } as RoomCardConfig;
    this._emitChanged();
  }

  private _ensureRows() {
    if (!Array.isArray((this._config as any).rows)) (this._config as any).rows = [];
  }
  private _ensureInfo() {
    if (!Array.isArray((this._config as any).info_entities)) (this._config as any).info_entities = [];
  }

  // ----- rows -----
  private _addRow = () => {
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    rows.push({ entities: [] });
    (this._config as any).rows = rows;
    this._emitChanged();
  };
  private _removeRow = (rowIndex: number) => {
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    rows.splice(rowIndex, 1);
    (this._config as any).rows = rows;
    this._emitChanged();
  };
  private _addRowEntity = (rowIndex: number) => {
    this._ensureRows();
    const rows = [ ...(this._config as any).rows ];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [ ...row.entities ] : [];
    row.entities.push({ entity: "", name: "", icon: "", show_icon: true, show_state: true });
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };
  private _removeRowEntity = (rowIndex: number, entIndex: number) => {
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

  // ----- info entities -----
  private _addInfoEntity = () => {
    this._ensureInfo();
    const info = [ ...(this._config as any).info_entities ];
    info.push({ entity: "", name: "", icon: "", show_icon: true, show_state: true });
    (this._config as any).info_entities = info;
    this._emitChanged();
  };
  private _removeInfoEntity = (index: number) => {
    this._ensureInfo();
    const info = [ ...(this._config as any).info_entities ];
    info.splice(index, 1);
    (this._config as any).info_entities = info;
    this._emitChanged();
  };
  private _updateInfoEntity = (index: number, key: string, value: any) => {
    this._ensureInfo();
    const info = [ ...(this._config as any).info_entities ];
    const ent = { ...(info[index] || {}) };
    (ent as any)[key] = value;
    info[index] = ent;
    (this._config as any).info_entities = info;
    this._emitChanged();
  };

  // ---------- UI-Bausteine ----------
  private _TF(label: string, value: string, onInput: (v: string) => void) {
    // Textfelder (Name/Icon-Fallbacks)
    return has.textfield()
      ? html`<ha-textfield .value=${value ?? ""} label=${label} @input=${(e: any) => onInput(e.currentTarget.value)}></ha-textfield>`
      : html`<label class="lbl">${label}<input class="plain" .value=${value ?? ""} @input=${(e: any) => onInput(e.currentTarget.value)} /></label>`;
  }

  // Immer Entity-Picker; ohne hass disabled (sichtbar)
  private _EntityPicker(label: string, value: string, onChange: (v: string) => void) {
    if (has.entityPicker()) {
      return html`<ha-entity-picker
        .hass=${this.hass}
        .value=${value ?? ""}
        label=${label}
        allow-custom-entity
        ?disabled=${!this.hass}
        @value-changed=${(e: any) => onChange(e.detail.value)}
      ></ha-entity-picker>`;
    }
    return this._TF(label + " (entity_id)", value, onChange);
  }

  private _IconPicker(value: string, onChange: (v: string) => void) {
    return has.iconPicker()
      ? html`<ha-icon-picker .value=${value ?? ""} label="Icon" @value-changed=${(e: any) => onChange(e.detail.value)}></ha-icon-picker>`
      : this._TF("Icon (mdi:…)", value, onChange);
  }
  private _Switch(label: string, checked: boolean, onChange: (v: boolean) => void) {
    if (has.haSwitch() && has.haFormfield()) {
      return html`<ha-formfield label=${label}><ha-switch .checked=${!!checked} @change=${(e: any) => onChange(!!e.currentTarget.checked)}></ha-switch></ha-formfield>`;
    }
    if (has.mwcSwitch() && has.mwcFormfield()) {
      return html`<mwc-formfield label=${label}><mwc-switch .checked=${!!checked} @change=${(e: any) => onChange(!!e.currentTarget.checked)}></mwc-switch></mwc-formfield>`;
    }
    return html`<label class="lbl"><input type="checkbox" .checked=${!!checked} @change=${(e: any) => onChange(!!e.currentTarget.checked)} /> ${label}</label>`;
  }
  private _Btn(label: string, onClick: () => void, kind: "primary" | "danger" | "ghost" = "primary") {
    return has.mwcButton()
      ? html`<mwc-button dense class=${kind} @click=${onClick}>${label}</mwc-button>`
      : html`<button class="plain-btn ${kind}" @click=${onClick}>${label}</button>`;
  }

  // ---------- render ----------
  protected render(): TemplateResult {
    if (!this._config) return html`<div class="hint">Loading editor…</div>`;
    const c: any = this._config;

    return html`
      <div class="form">
        <!-- Header -->
        <div class="section">
          <div class="section-title">Header</div>
          <div class="field">
            ${this._TF("Title", c.title ?? "", (v) => this._set("title", v))}
          </div>
          <div class="field">
            ${this._EntityPicker("Entity (required)", c.entity ?? "", (v) => this._set("entity", v))}
          </div>
          <div class="toggles">
            ${this._Switch("Hide title", !!c.hide_title, (v) => this._set("hide_title", v))}
          </div>
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
                            <div class="entity-block">
                              <div class="field">
                                ${this._EntityPicker("Entity", ent.entity ?? "", (v) => this._updateRowEntity(ri, ei, "entity", v))}
                              </div>
                              <div class="field">
                                ${this._TF("Name (optional)", ent.name ?? "", (v) => this._updateRowEntity(ri, ei, "name", v))}
                              </div>
                              <div class="field">
                                ${this._IconPicker(ent.icon ?? "", (v) => this._updateRowEntity(ri, ei, "icon", v))}
                              </div>
                              <div class="toggles">
                                ${this._Switch("Show icon", ent.show_icon !== false, (v) => this._updateRowEntity(ri, ei, "show_icon", v))}
                                ${this._Switch("Show state", ent.show_state !== false, (v) => this._updateRowEntity(ri, ei, "show_state", v))}
                              </div>
                              <div class="actions">
                                ${this._Btn("Remove", () => this._removeRowEntity(ri, ei), "danger")}
                              </div>
                            </div>
                          `,
                        )
                      : html`<div class="hint">No entities in this row yet.</div>`}
                  </div>
                `,
              )
            : html`<div class="hint">No rows yet. Click “Add row”.</div>`}
        </div>

        <!-- Info entities -->
        <div class="section">
          <div class="section-title">
            Info entities
            ${this._Btn("Add entity", this._addInfoEntity)}
          </div>

          ${Array.isArray(c.info_entities) && c.info_entities.length
            ? c.info_entities.map(
                (ent: any, i: number) => html`
                  <div class="entity-block">
                    <div class="field">
                      ${this._EntityPicker("Entity", ent.entity ?? "", (v) => this._updateInfoEntity(i, "entity", v))}
                    </div>
                    <div class="field">
                      ${this._TF("Name (optional)", ent.name ?? "", (v) => this._updateInfoEntity(i, "name", v))}
                    </div>
                    <div class="field">
                      ${this._IconPicker(ent.icon ?? "", (v) => this._updateInfoEntity(i, "icon", v))}
                    </div>
                    <div class="toggles">
                      ${this._Switch("Show icon", ent.show_icon !== false, (v) => this._updateInfoEntity(i, "show_icon", v))}
                      ${this._Switch("Show state", ent.show_state !== false, (v) => this._updateInfoEntity(i, "show_state", v))}
                    </div>
                    <div class="actions">
                      ${this._Btn("Remove", () => this._removeInfoEntity(i), "danger")}
                    </div>
                  </div>
                `,
              )
            : html`<div class="hint">No info entities. Click “Add entity”.</div>`}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display:block; box-sizing:border-box; padding:4px 0 8px; }
    /* Editorbreite begrenzen, damit er nicht in die Vorschau ragt */
    .form { display:grid; gap:16px; width:100%; max-width:560px; overflow:hidden; }

    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:600; flex-wrap:wrap; }

    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
    .row-actions { display:flex; gap:8px; flex-wrap:wrap; }

    .entity-block { display:grid; grid-template-columns: 1fr; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; }
    .field { min-width:0; }
    ha-textfield, ha-entity-picker, ha-icon-picker { width:100%; }
    .toggles { display:grid; gap:8px; align-content:start; }
    .actions { display:flex; gap:8px; justify-content:flex-end; }

    .hint { opacity:.7; font-style:italic; }
    .lbl { display:grid; gap:6px; font-size:.9rem; }
    input.plain { width:100%; padding:8px; border:1px solid var(--divider-color,#ddd); border-radius:6px; background:var(--card-background-color,#fff); color: var(--primary-text-color); }

    .plain-btn { padding:6px 10px; border-radius:8px; border:1px solid var(--divider-color,#ccc); background: var(--secondary-background-color,#f6f6f6); cursor:pointer; }
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
