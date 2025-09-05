import { html, TemplateResult } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { RoomCardConfig, RoomCardEntityConfig } from "./types/room-card-types";

/** --- Konfig-Validierung --- */
export function checkConfig(config: RoomCardConfig) {
  if (!config) throw new Error("No config");
  if (!config.entity) throw new Error("Header entity is required");
}

/** --- Karten-Styles dynamisch --- */
export function entityStyles(card_styles: any, stateObj: any, hass: HomeAssistant): string {
  // Falls du hier dynamische Styles per state/attributes setzt – beibehalten
  // Placeholder: einfache Übergabe
  if (!card_styles) return "";
  try {
    return Object.entries(card_styles)
      .map(([k, v]) => `${k}: ${String(v)};`)
      .join(" ");
  } catch {
    return "";
  }
}

/** --- Icon-Conditions Resolver --- */
type IconCondition = {
  entity: string;
  operator?: "=" | "!=" | "<" | ">" | "<=" | ">=" | "contains";
  value: string;
  icon: string;
};
type IconConditions = { conditions: IconCondition[]; else?: string };

function resolveIconFromConditions(hass: HomeAssistant, ic?: IconConditions): string | undefined {
  if (!ic || !Array.isArray(ic.conditions)) return undefined;
  for (const c of ic.conditions) {
    const st = c.entity && hass.states[c.entity];
    if (!st) continue;
    const left = String(st.state ?? "").toLowerCase();
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

function resolveIcon(conf: any, hass: HomeAssistant): string | undefined {
  if (conf?.icon_conditions) return resolveIconFromConditions(hass, conf.icon_conditions as IconConditions);
  return conf?.icon;
}

/** --- State-Formatierung --- */
function formatState(hass: HomeAssistant, entityId: string, decimals?: number, unitOverride?: string): string {
  const st = hass.states[entityId];
  if (!st) return "";
  const raw = st.state;
  const unit = unitOverride || (st.attributes?.unit_of_measurement as string) || "";
  const num = Number(raw);
  if (Number.isFinite(num) && typeof decimals === "number") {
    const s = num.toFixed(decimals);
    return unit ? `${s} ${unit}` : s;
  }
  return unit ? `${raw} ${unit}` : String(raw);
}

/** --- Title/Header --- */
export function renderTitle(config: any, hass: HomeAssistant, host: any, entityId?: string): TemplateResult {
  const title = config.title || "";
  const icon = resolveIcon(config, hass);
  const showTitle = !config.hide_title;

  const left = html`
    <div class="title">
      ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : null}
      ${showTitle ? html`<div class="name">${title}</div>` : null}
    </div>
  `;
  return left;
}

/** --- Info Entities --- */
export function renderInfoEntity(ent: any, hass: HomeAssistant, host: any): TemplateResult {
  const eid: string = ent.entity;
  const st = eid && hass.states[eid];
  const showIcon = ent.show_icon !== false;
  const icon = resolveIcon(ent, hass);
  const name = ent.name || (st?.attributes?.friendly_name as string) || eid || "";

  return html`
    <div class="entity">
      ${showIcon && (icon || st) ? html`<ha-icon .icon=${icon || "mdi:information-outline"}></ha-icon>` : null}
      <span>${name}${st ? `: ${st.state}` : ""}</span>
    </div>
  `;
}

/** --- Entities-Zeile (Fallback wenn keine rows) --- */
export function renderEntitiesRow(config: RoomCardConfig, entities: any[], hass: HomeAssistant, host: any): TemplateResult {
  return html`
    <div class="entities-row">
      ${entities.map((e) => renderEntityCell(e, hass))}
    </div>
  `;
}

/** --- Rows --- */
export function renderRows(rows: any[], hass: HomeAssistant, host: any): TemplateResult {
  return html`
    ${rows.map(
      (row) => html`
        <div class="entities-row">
          ${(row.entities || []).map((e: any) => renderEntityCell(e, hass))}
        </div>
      `,
    )}
  `;
}

/** --- Einzelne Zelle --- */
function renderEntityCell(ent: RoomCardEntityConfig & { decimals?: number; unit?: string }, hass: HomeAssistant): TemplateResult {
  const eid = ent.entity;
  const st = eid && hass.states[eid];
  const showIcon = ent.show_icon !== false;
  const showState = ent.show_state !== false;
  const icon = resolveIcon(ent, hass);
  const name = ent.name || (st?.attributes?.friendly_name as string) || eid || "";
  const val = (eid && showState) ? formatState(hass, eid, ent.decimals, ent.unit) : "";

  return html`
    <div class="entity">
      ${showIcon && (icon || st) ? html`<ha-icon .icon=${icon || "mdi:checkbox-blank-circle-outline"}></ha-icon>` : null}
      <div class="name">${name}</div>
      ${showState ? html`<div class="value">${val}</div>` : null}
    </div>
  `;
}
