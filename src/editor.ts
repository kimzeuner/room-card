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

type IconCondition = {
  entity: string;
  operator?: "=" | "!=" | "<" | ">" | "<=" | ">=" | "contains";
  value: string;
  icon: string;
};
type IconConditions = {
  conditions: IconCondition[];
  else?: string;
};

let _datalistCounter = 0;
let _radioGroupCounter = 0;

/** --- i18n (DE/EN) --- */
const STRINGS = {
  de: {
    header: "Header",
    title: "Titel",
    entityReq: "Entity (Pflichtfeld)",
    icon: "Icon",
    hideTitle: "Titel ausblenden",
    rows: "Reihen",
    addRow: "Reihe hinzufügen",
    addEntity: "Entity hinzufügen",
    removeRow: "Reihe entfernen",
    remove: "Entfernen",
    duplicate: "Duplizieren",
    moveUp: "Nach oben",
    moveDown: "Nach unten",
    nameOptional: "Name (optional)",
    showIcon: "Icon anzeigen",
    showState: "Zustand anzeigen",
    decimals: "Dezimalstellen",
    unitOverride: "Einheit (Override)",
    infoEntities: "Info Entities",
    noRows: "Noch keine Reihen. Klicke „Reihe hinzufügen“.",
    noEntitiesInRow: "Noch keine Entities in dieser Reihe.",
    noInfo: "Keine Info-Entities. Klicke „Entity hinzufügen“.",
    iconStatic: "Statisch",
    iconConditional: "Bedingt",
    conditions: "Bedingungen",
    operator: "Operator",
    value: "Wert",
    elseIcon: "Else-Icon (optional)",
    invalidHeaderEntity: "Header-Entity ist erforderlich.",
    invalidRowEntity: "Mindestens eine Entity in jeder Reihe ist erforderlich.",
    loading: "Editor wird geladen…",
  },
  en: {
    header: "Header",
    title: "Title",
    entityReq: "Entity (required)",
    icon: "Icon",
    hideTitle: "Hide title",
    rows: "Rows",
    addRow: "Add row",
    addEntity: "Add entity",
    removeRow: "Remove row",
    remove: "Remove",
    duplicate: "Duplicate",
    moveUp: "Move up",
    moveDown: "Move down",
    nameOptional: "Name (optional)",
    showIcon: "Show icon",
    showState: "Show state",
    decimals: "Decimals",
    unitOverride: "Unit (override)",
    infoEntities: "Info entities",
    noRows: "No rows yet. Click “Add row”.",
    noEntitiesInRow: "No entities in this row yet.",
    noInfo: "No info entities. Click “Add entity”.",
    iconStatic: "Static",
    iconConditional: "Conditional",
    conditions: "Conditions",
    operator: "Operator",
    value: "Value",
    elseIcon: "Else icon (optional)",
    invalidHeaderEntity: "Header entity is required.",
    invalidRowEntity: "At least one entity per row is required.",
    loading: "Loading editor…",
  },
};

function langOf(hass?: HomeAssistant) {
  const l =
    (hass?.locale as any)?.language ||
    (hass as any)?.language ||
    (navigator?.language || "en").slice(0, 2);
  return l.startsWith("de") ? "de" : "en";
}
function t(hass: HomeAssistant | undefined, key: keyof typeof STRINGS["en"]) {
  return STRINGS[langOf(hass)][key];
}

/** --- Helpers --- */
function isObject(v: any): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function isIconConditions(v: any): v is IconConditions {
  return isObject(v) && Array.isArray((v as any).conditions);
}
function coerceNumber(v: any, fallback: number | undefined): number | undefined {
  if (v === "" || v === undefined || v === null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function friendlyNameOf(hass: HomeAssistant | undefined, entityId?: string) {
  if (!hass || !entityId) return "";
  const st = hass.states?.[entityId];
  return (st?.attributes?.friendly_name as string) || "";
}

@customElement("room-card-editor")
export class RoomCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RoomCardConfig;
  @state() private _errors: string[] = [];

  constructor() {
    super();
    console.info("ROOM-CARD-EDITOR: constructed");
  }

  connectedCallback(): void {
    super.connectedCallback();
    ["ha-entity-picker", "ha-icon-picker"].forEach((tag) =>
      customElements.whenDefined(tag).then(() => this.requestUpdate()),
    );
  }

  public setConfig(config: RoomCardConfig): void {
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

    this._validate();
    this.requestUpdate();
  }

  /** --- Validation --- */
  private _validate() {
    const errs: string[] = [];
    const c: any = this._config || {};
    if (!c.entity) errs.push(t(this.hass, "invalidHeaderEntity"));
    if (Array.isArray(c.rows)) {
      for (const row of c.rows) {
        if (!Array.isArray(row.entities) || row.entities.length === 0) {
          errs.push(t(this.hass, "invalidRowEntity"));
          break;
        }
      }
    }
    this._errors = errs;
  }

  private _emitChanged() {
    this._validate();
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

  /** Buggy Picker (Overlay-Position) Workaround (falls nötig) */
  private _isBuggyPicker(): boolean {
    const v = this.hass?.config?.version ?? "";
    const m = v.match(/^(\d+)\.(\d+)\.(\d+)/);
    if (!m) return false;
    const major = Number(m[1]);
    const minor = Number(m[2]);
    return major === 2025 && minor >= 9;
  }

  /** --- Rows Ops (add/remove/move/dup) --- */
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
  private _moveRow = (rowIndex: number, dir: -1 | 1) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const j = rowIndex + dir;
    if (j < 0 || j >= rows.length) return;
    [rows[rowIndex], rows[j]] = [rows[j], rows[rowIndex]];
    (this._config as any).rows = rows;
    this._emitChanged();
  };
  private _dupRow = (rowIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const clone = JSON.parse(JSON.stringify(rows[rowIndex] || { entities: [] }));
    rows.splice(rowIndex + 1, 0, clone);
    (this._config as any).rows = rows;
    this._emitChanged();
  };

  /** --- Row Entities Ops --- */
  private _addRowEntity = (rowIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    row.entities.push({
      entity: "",
      name: "",
      icon: "",
      show_icon: true,
      show_state: true,
      decimals: undefined,
      unit: "",
    });
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
  private _moveRowEntity = (rowIndex: number, entIndex: number, dir: -1 | 1) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    const j = entIndex + dir;
    if (j < 0 || j >= row.entities.length) return;
    [row.entities[entIndex], row.entities[j]] = [row.entities[j], row.entities[entIndex]];
    rows[rowIndex] = row;
    (this._config as any).rows = rows;
    this._emitChanged();
  };
  private _dupRowEntity = (rowIndex: number, entIndex: number) => {
    this._ensureRows();
    const rows = [...(this._config as any).rows];
    const row = { ...(rows[rowIndex] || { entities: [] }) };
    row.entities = Array.isArray(row.entities) ? [...row.entities] : [];
    const clone = JSON.parse(JSON.stringify(row.entities[entIndex] || {}));
    row.entities.splice(entIndex + 1, 0, clone);
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

  /** --- Info Entities --- */
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
  private _moveInfoEntity = (index: number, dir: -1 | 1) => {
    this._ensureInfo();
    const info = [...(this._config as any).info_entities];
    const j = index + dir;
    if (j < 0 || j >= info.length) return;
    [info[index], info[j]] = [info[j], info[index]];
    (this._config as any).info_entities = info;
    this._emitChanged();
  };
  private _dupInfoEntity = (index: number) => {
    this._ensureInfo();
    const info = [...(this._config as any).info_entities];
    const clone = JSON.parse(JSON.stringify(info[index] || {}));
    info.splice(index + 1, 0, clone);
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

  /** --- UI Primitives --- */
  private _TF(label: string, value: string, onInput: (v: string) => void) {
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
  private _NumTF(label: string, value: number | undefined, onInput: (v: number | undefined) => void) {
    return has.textfield()
      ? html`<ha-textfield
          type="number"
          .value=${value ?? ""}
          label=${label}
          @input=${(e: any) => onInput(coerceNumber(e.currentTarget.value, undefined))}
        ></ha-textfield>`
      : html`<label class="lbl">
          ${label}
          <input
            class="plain"
            type="number"
            .value=${value ?? ""}
            @input=${(e: any) => onInput(coerceNumber(e.currentTarget.value, undefined))}
          />
        </label>`;
  }

  private _EntityPicker(label: string, value: string, onChange: (v: string) => void, onAutoName?: (n: string)=>void) {
    const useFallback = this._isBuggyPicker();

    const handleSelected = (v: string) => {
      onChange(v);
      if (onAutoName) {
        const fn = friendlyNameOf(this.hass, v);
        if (fn) onAutoName(fn);
      }
    };

    if (has.entityPicker() && !useFallback) {
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
            @value-changed=${(e: any) => handleSelected(e.detail.value)}
          ></ha-entity-picker>
        </div>
      `;
    }

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
            @change=${(e: any) => handleSelected(e.currentTarget.value)}
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

  private _IconPicker(value: string, onChange: (v: string) => void, preview?: string) {
    const pick =
      has.iconPicker()
        ? html`<ha-icon-picker
            .value=${value ?? ""}
            label=${t(this.hass, "icon")}
            @value-changed=${(e: any) => onChange(e.detail.value)}
          ></ha-icon-picker>`
        : this._TF("Icon (mdi:…)", value, onChange);

    return html`
      <div class="icon-row">
        <div class="icon-preview">
          <ha-icon .icon=${preview || value || "mdi:help-circle-outline"}></ha-icon>
        </div>
        <div class="icon-input">${pick}</div>
      </div>
    `;
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

  /** --- Icon Preview evaluation (simple) --- */
  private _evalIconPreview(ic: IconConditions | undefined): string | undefined {
    if (!ic || !Array.isArray(ic.conditions) || !this.hass) return undefined;
    const H = this.hass;
    for (const c of ic.conditions) {
      const st = c.entity && H.states[c.entity];
      if (!st) continue;
      const left = String((st.state ?? "")).toLowerCase();
      const right = String(c.value ?? "").toLowerCase();
      const op = c.operator ?? "=";
      let ok = false;
      if (op === "=") ok = left === right;
      else if (op === "!=") ok = left !== right;
      else if (op === "contains") ok = left.includes(right);
      else {
        const ln = Number(st.state); const rn = Number(c.value);
        if (Number.isFinite(ln) && Number.isFinite(rn)) {
          if (op === "<") ok = ln < rn;
          else if (op === ">") ok = ln > rn;
          else if (op === "<=") ok = ln <= rn;
          else if (op === ">=") ok = ln >= rn;
        }
      }
      if (ok && c.icon) return c.icon;
    }
    return ic.else || undefined;
  }

  /** --- Icon Control (Static vs Conditional) --- */
  private _IconControl(
    label: string,
    source: "header" | "row" | "info",
    indices: { ri?: number; ei?: number; ii?: number } | null,
    data: any,
  ) {
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

    const preview =
      modeConditional
        ? this._evalIconPreview((value?.conditions ? value : data.icon_conditions) as IconConditions)
        : (typeof value === "string" ? value : undefined);

    return html`
      <div class="icon-control">
        <div class="icon-mode">
          <label><input type="radio" name=${radioName} .checked=${!modeConditional} @change=${setStatic} /> ${t(this.hass,"iconStatic")}</label>
          <label><input type="radio" name=${radioName} .checked=${modeConditional} @change=${setConditional} /> ${t(this.hass,"iconConditional")}</label>
        </div>

        ${modeConditional
          ? this._IconConditionsEditor(label, value?.conditions ? (value as IconConditions) : (data.icon_conditions as IconConditions), updateCond, preview)
          : html`<div class="field">${this._IconPicker(typeof value === "string" ? value : "", updateStaticIcon, preview)}</div>`}
      </div>
    `;
  }

  private _IconConditionsEditor(
    label: string,
    value: IconConditions | undefined,
    onChange: (v: IconConditions) => void,
    preview?: string,
  ) {
    const current: IconConditions = value && isIconConditions(value) ? value : { conditions: [], else: "" };

    const changeCond = (idx: number, patch: Partial<IconCondition>) => {
      const next: IconConditions = { conditions: [...current.conditions], else: current.else ?? "" };
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
        <div class="cond-title">${label} – ${t(this.hass, "conditions")}</div>

        ${current.conditions.length
          ? current.conditions.map(
              (c, i) => html`
                <div class="cond-row">
                  <div class="field">
                    ${this._EntityPicker("Entity", c.entity ?? "", (v) => changeCond(i, { entity: v }))}
                  </div>

                  <div class="field">
                    <ha-select
                      naturalMenuWidth
                      label=${t(this.hass, "operator")}
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
                    ${this._TF(t(this.hass, "value"), c.value ?? "", (v) => changeCond(i, { value: v }))}
                  </div>

                  <div class="field">
                    ${this._IconPicker(c.icon ?? "", (v) => changeCond(i, { icon: v }))}
                  </div>

                  <div class="actions">
                    ${this._Btn(t(this.hass, "remove"), () => removeCond(i), "danger")}
                  </div>
                </div>
              `,
            )
          : html`<div class="hint">No conditions yet.</div>`}

        <div class="actions">${this._Btn("Add condition", addCond, "ghost")}</div>

        <div class="field">
          ${this._IconPicker(current.else ?? "", changeElse, preview)}
        </div>
        <div class="hint">${t(this.hass, "elseIcon")}</div>
      </div>
    `;
  }

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

  /** --- render --- */
  protected render(): TemplateResult {
    if (!this._config) return html`<div class="hint">${t(this.hass, "loading")}</div>`;
    const c: any = this._config;

    return html`
      <div class="form">
        <!-- Errors -->
        ${this._errors.length
          ? html`<div class="errors">${this._errors.map((e) => html`<div class="error">${e}</div>`)}</div>`
          : null}

        <!-- Header -->
        <div class="section">
          <div class="section-title">${t(this.hass, "header")}</div>
          <div class="field">
            ${this._TF(t(this.hass, "title"), c.title ?? "", (v) => this._set("title", v))}
          </div>
          <div class="field">
            ${this._EntityPicker(
              t(this.hass, "entityReq"),
              c.entity ?? "",
              (v) => this._set("entity", v),
              (auto) => { if (!c.title || c.title === "Room") this._set("title", auto); }
            )}
          </div>
          <div class="field">
            ${this._IconControl(t(this.hass, "icon"), "header", null, c)}
          </div>
          <div class="toggles">
            ${this._Switch(t(this.hass, "hideTitle"), !!c.hide_title, (v) => this._set("hide_title", v))}
          </div>
        </div>

        <!-- Rows -->
        <div class="section">
          <div class="section-title">
            ${t(this.hass, "rows")}
            <span class="row-toolbar">
              ${this._Btn(t(this.hass, "addRow"), this._addRow)}
            </span>
          </div>

          ${(c.rows ?? []).length
            ? c.rows.map(
                (row: any, ri: number) => html`
                  <div class="row-card">
                    <div class="row-header">
                      <div class="row-title">Row ${ri + 1}</div>
                      <div class="row-actions">
                        ${this._Btn(t(this.hass, "moveUp"), () => this._moveRow(ri, -1), "ghost")}
                        ${this._Btn(t(this.hass, "moveDown"), () => this._moveRow(ri, +1), "ghost")}
                        ${this._Btn(t(this.hass, "duplicate"), () => this._dupRow(ri), "ghost")}
                        ${this._Btn(t(this.hass, "removeRow"), () => this._removeRow(ri), "danger")}
                        ${this._Btn(t(this.hass, "addEntity"), () => this._addRowEntity(ri))}
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
                                  (auto) => {
                                    if (!ent.name) this._updateRowEntity(ri, ei, "name", auto);
                                  }
                                )}
                              </div>
                              <div class="field">
                                ${this._TF(
                                  t(this.hass, "nameOptional"),
                                  ent.name ?? "",
                                  (v) => this._updateRowEntity(ri, ei, "name", v),
                                )}
                              </div>
                              <div class="field">
                                ${this._IconControl("Icon", "row", { ri, ei }, ent)}
                              </div>
                              <div class="toggles">
                                ${this._Switch(
                                  t(this.hass, "showIcon"),
                                  ent.show_icon !== false,
                                  (v) => this._updateRowEntity(ri, ei, "show_icon", v),
                                )}
                                ${this._Switch(
                                  t(this.hass, "showState"),
                                  ent.show_state !== false,
                                  (v) => this._updateRowEntity(ri, ei, "show_state", v),
                                )}
                              </div>
                              <div class="field two">
                                ${this._NumTF(
                                  t(this.hass, "decimals"),
                                  ent.decimals,
                                  (v) => this._updateRowEntity(ri, ei, "decimals", v),
                                )}
                                ${this._TF(
                                  t(this.hass, "unitOverride"),
                                  ent.unit ?? "",
                                  (v) => this._updateRowEntity(ri, ei, "unit", v),
                                )}
                              </div>
                              <div class="actions">
                                ${this._Btn(t(this.hass, "moveUp"), () => this._moveRowEntity(ri, ei, -1), "ghost")}
                                ${this._Btn(t(this.hass, "moveDown"), () => this._moveRowEntity(ri, ei, +1), "ghost")}
                                ${this._Btn(t(this.hass, "duplicate"), () => this._dupRowEntity(ri, ei), "ghost")}
                                ${this._Btn(t(this.hass, "remove"), () => this._removeRowEntity(ri, ei), "danger")}
                              </div>
                            </div>
                          `,
                        )
                      : html`<div class="hint">${t(this.hass, "noEntitiesInRow")}</div>`}
                  </div>
                `,
              )
            : html`<div class="hint">${t(this.hass, "noRows")}</div>`}
        </div>

        <!-- Info entities -->
        <div class="section">
          <div class="section-title">
            ${t(this.hass, "infoEntities")}
            ${this._Btn(t(this.hass, "addEntity"), this._addInfoEntity)}
          </div>

          ${Array.isArray(c.info_entities) && c.info_entities.length
            ? c.info_entities.map(
                (ent: any, i: number) => html`
                  <div class="entity-block">
                    <div class="field">
                      ${this._EntityPicker("Entity", ent.entity ?? "", (v) => this._updateInfoEntity(i, "entity", v),
                        (auto) => { if (!ent.name) this._updateInfoEntity(i, "name", auto); })}
                    </div>
                    <div class="field">
                      ${this._TF(t(this.hass, "nameOptional"), ent.name ?? "", (v) => this._updateInfoEntity(i, "name", v))}
                    </div>
                    <div class="field">
                      ${this._IconControl("Icon", "info", { ii: i }, ent)}
                    </div>
                    <div class="toggles">
                      ${this._Switch(
                        t(this.hass, "showIcon"),
                        ent.show_icon !== false,
                        (v) => this._updateInfoEntity(i, "show_icon", v),
                      )}
                    </div>
                    <div class="actions">
                      ${this._Btn(t(this.hass, "moveUp"), () => this._moveInfoEntity(i, -1), "ghost")}
                      ${this._Btn(t(this.hass, "moveDown"), () => this._moveInfoEntity(i, +1), "ghost")}
                      ${this._Btn(t(this.hass, "duplicate"), () => this._dupInfoEntity(i), "ghost")}
                      ${this._Btn(t(this.hass, "remove"), () => this._removeInfoEntity(i), "danger")}
                    </div>
                  </div>
                `,
              )
            : html`<div class="hint">${t(this.hass, "noInfo")}</div>`}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display:block; box-sizing:border-box; padding:4px 0 8px; }

    .form {
      display: grid;
      gap: 16px;
      width: 100%;
      max-width: 620px;
      overflow: visible;
    }

    .errors { display:grid; gap:6px; }
    .error { color: var(--error-color, #d32f2f); font-weight: 600; }

    .section { display:grid; gap:12px; padding:8px 0; border-top:1px solid var(--divider-color, #e0e0e0); }
    .section:first-child { border-top:none; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:600; flex-wrap:wrap; }
    .row-toolbar { display:flex; gap:8px; }

    .row-card { border:1px solid var(--divider-color, #e0e0e0); border-radius:10px; padding:10px; display:grid; gap:12px; }
    .row-header { display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
    .row-actions { display:flex; gap:8px; flex-wrap:wrap; }

    .entity-block { display:grid; grid-template-columns: 1fr; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; overflow:visible; }
    .field { min-width:0; overflow:visible; position:relative; }
    .field.two { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }

    .picker-anchor { position: relative; overflow: visible; width: 100%; }

    ha-entity-picker,
    ha-icon-picker,
    ha-textfield,
    ha-combo-box,
    ha-select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
    }

    ha-entity-picker {
      --mdc-menu-min-width: 100%;
      --vaadin-combo-box-overlay-width: 100%;
    }

    /* Icon preview row */
    .icon-row { display:grid; grid-template-columns: auto 1fr; align-items:center; gap:10px; }
    .icon-preview { width: 36px; height: 36px; display:flex; align-items:center; justify-content:center; }
    .icon-preview ha-icon { --mdc-icon-size: 24px; }

    /* Icon-Mode & Conditions: immer vertikal */
    .icon-control { display:grid; gap:8px; }
    .icon-mode { display:flex; gap:16px; align-items:center; }

    .cond-wrap { display:grid; gap:10px; padding:8px; border:1px dashed var(--divider-color,#ddd); border-radius:8px; }
    .cond-title { font-weight:600; }

    .cond-wrap .cond-row {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr !important;
      gap: 10px;
      width: 100%;
    }
    .cond-wrap .cond-row > .field,
    .cond-wrap .cond-row > .actions {
      grid-column: 1 / -1 !important;
      width: 100%;
    }
    .cond-wrap .cond-row ha-select {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      display: block;
      --mdc-menu-min-width: 100%;
    }

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
