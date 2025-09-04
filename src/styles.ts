import { css } from "lit";

export const style = css`
  /* Grundlayout */
  ha-card {
    display: flex;
    flex-direction: column;
  }

  /* ---------- Header: saubere Vertikal-Zentrierung ---------- */
  .card-header {
    /* macht den gesamten Header zur Flex-Zeile */
    display: flex;
    align-items: center;         /* Icon + Titel vertikal mittig */
    justify-content: space-between;
    gap: 12px;
    padding: 12px 20px 0 20px;   /* wie vorher, nur konsistent */
    position: relative;          /* Anker für .entities-info-row (absolute) */
    min-height: 48px;            /* stabile Header-Höhe */
    box-sizing: border-box;
  }

  /* Block mit Icon (links) – KEIN float mehr */
  .main-state {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  /* Icon/Badge wirklich mittig in seiner Box */
  .main-state > ha-state-icon,
  .main-state > ha-icon,
  .card-header state-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* SVG vertikal mittig statt baseline */
  .main-state > ha-state-icon > ha-svg-icon {
    vertical-align: middle;
  }

  /* Titelblock: kein künstliches min-height, mittig ausrichten */
  .title {
    display: flex;
    align-items: center;
    margin: 0;
    min-height: 0;
    line-height: 1.2;
  }

  /* ---------- Info-Entities oben rechts (optional) ---------- */
  .entities-info-row {
    position: absolute;
    right: 20px;
    top: 50%;                    /* vertikal mittig zum Header */
    transform: translateY(-50%);
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 0 0 0 20px;         /* innen etwas Luft */
    font-size: 12px;
    box-sizing: border-box;
  }

  .entities-info-row .entity.icon-entity {
    margin-right: 0;
  }

  /* ---------- Entities-Zeile(n) im Card-Body ---------- */
  .entities-row {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px 10px 20px;
    gap: 16px;
  }

  .entity {
    text-align: center;
    cursor: pointer;
  }

  .entity span {
    font-size: 10px;
  }

  .entities-column {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-evenly;
  }

  .entities-column .entity div {
    display: inline-block;
    vertical-align: middle;
  }

  .icon-small {
    display: inline-block;
  }

  .main-icon {
    font-size: 30px;
    vertical-align: middle;
  }

  .clickable { cursor: pointer; }

  .content-left   { justify-content: flex-start; }
  .content-center { justify-content: center; }
  .content-right  { justify-content: flex-end; }
`;
