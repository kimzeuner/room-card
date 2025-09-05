import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { RoomCardConfig } from "./types/room-card-types";

console.info("ROOM-CARD-EDITOR: module loaded");

const has = {
  textfield: () => !!customElements.get("ha-textfield"),
  iconPicker: () => !!customElements.get("ha-icon-picker"),
  haSwitch: () => !!customElements.get("ha-switch"),
  haFormfield: () => !!customElements.get("ha-formfield"),
  mwcSwitch: () => !!customElements.get("mwc-switch"),
  mwcFormfield: () => !!customElements.get("mwc-formfield"),
  mwcButton: () => !!customElements.get("mwc-button"),
  entityPicker: () => !!customElements.get("ha-entity-picker"),
};

let _datalistCounter = 0;
let _radioGroupCounter = 0;

type IconCondition = {
  entity: string;
  operator?: "=" | "!=" | "<" | ">" | "<=" | ">=" | "contains"; // optional, default "="
  value: string;
  icon: string;
};
type IconConditions = {
  conditions: IconCondition[];
  else?: string;
};

function isObject(v: any): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function isIconConditions(v: any): v is IconConditions {
  return isObject(v) && Array.isArray((v as any).conditions);
}

@customElement("room-card-editor")
export class RoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RoomCardConfig;

  constructor() {
    super();
    console.info("ROOM-CARD-EDITOR: constructed");
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Wenn HA die Komponenten lazy lädt, danach neu rendern
    ["ha-entity-picker", "ha-icon-picker"].forEach((tag) =>
      customElements.whenDefined(tag).then(() => this.requestUpdate()),
    );
  }

  public setConfig(config: RoomCardConfig): void {
    console.info("ROOM-CARD-EDITOR: setConfig()", config);

    const safeRows = Array.isArray((config as any).rows)
      ? (config as any).rows.map((r: any) => ({
          ...r,
          entities: Array.isArray(r?.entities) ? [...r.entities] : [],
        }))
      : [];

    const safeInfo = Array.isArray((config as any).info_entities)
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

  // HA 2025.9.x: Overlay-Position im Dialog zickt -> Fallback erzwingen
  private _isBuggyPicker(): boolean {
    const v = this.hass?.config?.version ?? "";
    const m = v.match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!m) return false;
    const major = Number(m[1]);
    const minor = Number(m[2]);
    return major === 2025 && minor >= 9; // ab 2025.9.*
  }

  // ----- rows -----
  private _addRow = () => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    rows.push({ entities: [] });
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _removeRow = (rowIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    rows.splice(rowIndex, 1);
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _addRowEntity = (rowIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    row.entities.push({ entity: "", name: "", icon: "", show_icon: true, show_state: true });
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _removeRowEntity = (rowIndex: number, entIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    row.entities.splice(entIndex, 1);
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  private _updateRowEntity = (rowIndex: number, entIndex: number, key: string, value: any) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    const ent = { ...(row.entities[entIndex] || {}) };
    (ent as any)[key] = value;
    row.entities[entIndex] = ent;
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  // ----- info entities (ohne show_state) -----
  private _addInfoEntity = () => {
    this._ensureInfo();
    const info = [...(this._config as any).info_entities];
    info.push({ entity: "", name: "", icon: "", show_icon: true });
    (this._config as any).info_entities = info;
    this._emitChanged();
  };

  private _removeInfoEntity = (index: number) => {
    this._ensureInfo();
    const info = [...(this._config as any).info_entities];
    info.splice(index, 1);
    (this._config as any).info_entities = info;
    this._emitChanged();
  };

  private _updateInfoEntity = (index: number, key: string, value: any) => {
    this._ensureInfo();
    const info = [...(this._config as any).info_entities];
    const ent = { ...(info[index] || {}) };
    (ent as any)[key] = value;
    info[index] = ent;
    (this._config as any).info_entities = info;
    this._emitChanged();
  };

  // ---------- UI primitives ----------
  private _TF(label: string, value: string, onInput: (v: string) => void) {
    // Nur für Name/Icon-Fallbacks
    return has.textfield()
      ? html`<ha-textfield
          .value=${value ?? ""}
          label=${label}
          @input=${(e: any) => onInput(e.currentTarget.value)}
        ></ha-textfield>`
      : html`<label class="lbl">
          ${label}
          <input class="plain" .value=${value ?? ""} @input=${(e: any) => onInput(e.currentTarget.value)} />
        </label>`;
  }

  private _EntityPicker(label: string, value: string, onChange: (v: string) => void) {
    const useFallback = this._isBuggyPicker();

    if (has.entityPicker() && !useFallback) {
      // Echter HA-Entity-Picker (wenn Version OK)
      return html`
        <div class="picker-anchor">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${value ?? ""}
            label=${label}
            allow-custom-entity
            ?disabled=${!this.hass}
            style="
              width:100%; display:block;
              --mdc-menu-min-width: 100%;
              --vaadin-combo-box-overlay-width: 100%;
              --mdc-menu-surface-vertical-offset: 2px;
            "
            @value-changed=${(e: any) => onChange(e.detail.value)}
          ></ha-entity-picker>
        </div>
      `;
    }

    // Fallback: native datalist (öffnet stabil unter dem Feld)
    const listId = `rc-entities-${++_datalistCounter}`;
    const entities = Object.keys(this.hass?.states ?? {}).sort();
    return html`
      <div class="picker-anchor">
        <label class="lbl">
          ${label}
          <input
            class="plain"
            list=${listId}
            .value=${value ?? ""}
            @input=${(e: any) => onChange(e.currentTarget.value)}
            placeholder="sensor.xyz, switch.xyz, …"
            style="width:100%;"
          />
        </label>
        <datalist id=${listId}>
          ${entities.map((eid) => html`<option value=${eid}></option>`)}
        </datalist>
      </div>
    `;
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
    if (has.haSwitch() && has.haFormfield()) {
      return html`<ha-formfield label=${label}
        ><ha-switch .checked=${!!checked} @change=${(e: any) => onChange(!!(e.currentTarget as any).checked)}></ha-switch
      ></ha-formfield>`;
    }
    if (has.mwcSwitch() && has.mwcFormfield()) {
      return html`<mwc-formfield label=${label}
        ><mwc-switch .checked=${!!checked} @change=${(e: any) => onChange(!!(e.currentTarget as any).checked)}></mwc-switch
      ></mwc-formfield>`;
    }
    return html`<label class="lbl"
      ><input type="checkbox" .checked=${!!checked} @change=${(e: any) => onChange(!!(e.currentTarget as any).checked)} />
      ${label}</label
    >`;
  }

  private _Btn(label: string, onClick: () => void, kind: "primary" | "danger" | "ghost" = "primary") {
    return has.mwcButton()
      ? html`<mwc-button dense class=${kind} @click=${onClick}>${label}</mwc-button>`
      : html`<button class="plain-btn ${kind}" @click=${onClick}>${label}</button>`;
  }

  // ---------- Icon Control (Static vs Conditional) ----------
  private _IconControl(
    label: string,
    // entweder: string (static) ODER: {conditions:[...], else?:string} ODER: {icon_conditions:{...}}
    source: "header" | "row" | "info",
    indices: { ri?: number; ei?: number; ii?: number } | null,
    data: any,
  ) {
    // "icon_conditions" Feld erkennen und als Quelle bevorzugen
    let value: any = (data && (data.icon_conditions ?? data.icon)) ?? "";
    const modeConditional = isIconConditions(value) || isIconConditions(data?.icon_conditions);

    const radioName = `rc-icon-mode-${++_radioGroupCounter}`;

    const setStatic = () => {
      const newIcon = typeof value === "string" ? value : "";
      this._assignIcon(source, indices, { icon: newIcon, icon_conditions: undefined });
    };

    const setConditional = () => {
      const obj: IconConditions = isIconConditions(value)
        ? value
        : { conditions: [{ entity: "", operator: "=", value: "", icon: "" }], else: "" };
      this._assignIcon(source, indices, { icon: undefined, icon_conditions: obj });
    };

    const updateStaticIcon = (v: string) => {
      this._assignIcon(source, indices, { icon: v, icon_conditions: undefined });
    };

    const updateCond = (next: IconConditions) => {
      this._assignIcon(source, indices, { icon: undefined, icon_conditions: next });
    };

    // UI
    return html`
      <div class="icon-control">
        <div class="icon-mode">
          <label><input type="radio" name=${radioName} .checked=${!modeConditional} @change=${setStatic} /> Static</label>
          <label><input type="radio" name=${radioName} .checked=${modeConditional} @change=${setConditional} /> Conditional</label>
        </div>

        ${modeConditional
          ? this._IconConditionsEditor(label, value?.conditions ? (value as IconConditions) : (data.icon_conditions as IconConditions) , updateCond)
          : html`<div class="field">${this._IconPicker(typeof value === "string" ? value : "", updateStaticIcon)}</div>`}
      </div>
    `;
  }

  private _IconConditionsEditor(label: string, value: IconConditions | undefined, onChange: (v: IconConditions) => void) {
    const current: IconConditions = value && isIconConditions(value) ? value : { conditions: [], else: "" };

    const changeCond = (idx: number, patch: Partial<IconCondition>) => {
      const next: IconConditions = {
        conditions: [...current.conditions],
        else: current.else ?? "",
      };
      next.conditions[idx] = { ...next.conditions[idx], ...patch };
      onChange(next);
    };

    const addCond = () => {
      const next: IconConditions = { conditions: [...current.conditions], else: current.else ?? "" };
      next.conditions.push({ entity: "", operator: "=", value: "", icon: "" });
      onChange(next);
    };

    const removeCond = (idx: number) => {
      const next: IconConditions = { conditions: [...current.conditions], else: current.else ?? "" };
      next.conditions.splice(idx, 1);
      onChange(next);
    };

    const changeElse = (v: string) => {
      const next: IconConditions = { conditions: [...current.conditions], else: v };
      onChange(next);
    };

    return html`
      <div class="cond-wrap">
        <div class="cond-title">${label} – Conditions</div>
        ${current.conditions.length
          ? current.conditions.map(
              (c, i) => html`
                <div class="cond-row">
                  <div class="field">${this._EntityPicker("Entity", c.entity ?? "", (v) => changeCond(i, { entity: v }))}</div>
                  <div class="field">
                    <ha-select
                      naturalMenuWidth
                      label="Operator"
                      .value=${c.operator ?? "="}
                      @selected=${(e: any) => changeCond(i, { operator: (e.target as any).value })}
                      @closed=${(e: any) => e.stopPropagation()}
                    >
                      <mwc-list-item value="=">=</mwc-list-item>
                      <mwc-list-item value="!=">!=</mwc-list-item>
                      <mwc-list-item value="<"><</mwc-list-item>
                      <mwc-list-item value=">">></mwc-list-item>
                      <mwc-list-item value="<="><=</mwc-list-item>
                      <mwc-list-item value=">=">>=</mwc-list-item>
                      <mwc-list-item value="contains">contains</mwc-list-item>
                    </ha-select>
                  </div>
                  <div class="field">
                    ${this._TF("Value", c.value ?? "", (v) => changeCond(i, { value: v }))}
                  </div>
                  <div class="field">
                    ${this._IconPicker(c.icon ?? "", (v) => changeCond(i, { icon: v }))}
                  </div>
                  <div class="actions">${this._Btn("Remove", () => removeCond(i), "danger")}</div>
                </div>
              `,
            )
          : html`<div class="hint">No conditions yet.</div>`}

        <div class="actions">${this._Btn("Add condition", addCond, "ghost")}</div>

        <div class="field">
          ${this._IconPicker(current.else ?? "", changeElse)}
        </div>
        <div class="hint">Optional “else” icon (used if no condition matches).</div>
      </div>
    `;
  }

  // trägt Icon / Icon-Conditions ins passende Ziel ein
  private _assignIcon(
    source: "header" | "row" | "info",
    indices: { ri?: number; ei?: number; ii?: number } | null,
    payload: { icon?: string | undefined; icon_conditions?: IconConditions | undefined },
  ) {
    if (!this._config) return;

    if (source === "header") {
      const next: any = { ...(this._config as any) };
      if (payload.icon_conditions !== undefined) {
        delete next.icon;
        next.icon_conditions = payload.icon_conditions;
      } else {
        delete next.icon_conditions;
        next.icon = payload.icon ?? "";
      }
      this._config = next as RoomCardConfig;
      this._emitChanged();
      return;
    }

    if (source === "row" && indices && typeof indices.ri === "number" && typeof indices.ei === "number") {
      this._ensureRows();
      const rows = [...((this._config as any).rows ?? [])];
      const row = { ...(rows[indices.ri] || { entities: [] }) };
      row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
      const ent = { ...(row.entities[indices.ei] || {}) };

      if (payload.icon_conditions !== undefined) {
        delete (ent as any).icon;
        (ent as any).icon_conditions = payload.icon_conditions;
      } else {
        delete (ent as any).icon_conditions;
        (ent as any).icon = payload.icon ?? "";
      }

      row.entities[indices.ei] = ent;
      rows[indices.ri] = row;
      (this._config as any).rows = rows;
      this._emitChanged();
      return;
    }

    if (source === "info" && indices && typeof indices.ii === "number") {
      this._ensureInfo();
      const info = [...((this._config as any).info_entities ?? [])];
      const ent = { ...(info[indices.ii] || {}) };

      if (payload.icon_conditions !== undefined) {
        delete (ent as any).icon;
        (ent as any).icon_conditions = payload.icon_conditions;
      } else {
        delete (ent as any).icon_conditions;
        (ent as any).icon = payload.icon ?? "";
      }

      info[indices.ii] = ent;
      (this._config as any).info_entities = info;
      this._emitChanged();
    }
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
          <div class="field">
            ${this._IconControl("Icon", "header", null, c)}
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
                                ${this._EntityPicker(
                                  "Entity",
                                  ent.entity ?? "",
                                  (v) => this._updateRowEntity(ri, ei, "entity", v),
                                )}
                              </div>
                              <div class="field">
                                ${this._TF(
                                  "Name (optional)",
                                  ent.name ?? "",
                                  (v) => this._updateRowEntity(ri, ei, "name", v),
                                )}
                              </div>
                              <div class="field">
                                ${this._IconControl("Icon", "row", { ri, ei }, ent)}
                              </div>
                              <div class="toggles">
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

        <!-- Info entities (ohne Show state) -->
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
                      ${this._IconControl("Icon", "info", { ii: i }, ent)}
                    </div>
                    <div class="toggles">
                      ${this._Switch(
                        "Show icon",
                        ent.show_icon !== false,
                        (v) => this._updateInfoEntity(i, "show_icon", v),
                      )}
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

    /* Editorbreite begrenzen, aber Overlays NICHT abschneiden */
    .form {
      display: grid;
      gap: 16px;
      width: 100%;
      max-width: 560px;
      overflow: visible; /* wichtig für Menüs */
    }

    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:600; flex-wrap:wrap; }

    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
    .row-actions { display:flex; gap:8px; flex-wrap:wrap; }

    /* Jedes Feld darf Overlays anzeigen */
    .entity-block { display:grid; grid-template-columns: 1fr; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; overflow:visible; }
    .field { min-width:0; overflow:visible; position:relative; }

    /* Stabile Ankerbox für Overlays/Fallback */
    .picker-anchor { position: relative; overflow: visible; width: 100%; }

    /* Eingabeelemente auf volle Breite + korrektes Box-Sizing */
    ha-entity-picker,
    ha-icon-picker,
    ha-textfield,
    ha-combo-box {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
    }

    /* Menüs gleich breit wie das Feld (wirksam bei nicht-buggy Versionen) */
    ha-entity-picker {
      --mdc-menu-min-width: 100%;
      --vaadin-combo-box-overlay-width: 100%;
    }

    /* Icon-Mode Umschalter & Conditions */
    .icon-control { display:grid; gap:8px; }
    .icon-mode { display:flex; gap:16px; align-items:center; }
    .cond-wrap { display:grid; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; }
    .cond-title { font-weight:600; }
    /* Immer vertikal: jedes Feld untereinander */
    .cond-row {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr;   /* keine Spalten nebeneinander */
    }
    /* Felder & Buttons volle Breite */
    .cond-row .field,
    .cond-row .actions {
      width: 100%;
    }
    /* Select und Picker über die volle Breite */
    ha-select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
    }

    /* HA-Toggles & Buttons */
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
