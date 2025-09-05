import { css } from 'lit';

export const style = css`
  ha-card {
    display: flex;
    flex-direction: column;
  }

  /* Header sauber ausrichten */
  .card-header {
    display: flex;
    align-items: center;           /* vertikale Zentrierung */
    justify-content: space-between;
    gap: 12px;
    min-height: 48px;
    padding: 8px 16px 0 16px;
    box-sizing: border-box;
  }

  /* Linker Titelblock (Icon + Text) */
  .card-header > *:first-child {
    display: inline-flex;
    align-items: center;           /* Icon + Text gleiche Höhe */
    gap: 8px;
    min-height: 32px;
  }

  .card-header state-badge,
  .card-header ha-state-icon,
  .card-header ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* Info-Entities rechts: Icons/Text vertikal mittig */
  .entities-info-row {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;           /* hier: vertikal mittig */
    justify-content: center;
    font-size: 12px;
    padding-right: 4px;
  }
  .entities-info-row .entity {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .entities-info-row .entity ha-icon,
  .entities-info-row .entity ha-state-icon,
  .entities-info-row .entity state-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  /* Hauptinhalte */
  .entity {
    text-align: center;
    cursor: pointer;
  }
  .entity span {
    font-size: 10px;
  }

  .entities-row {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    padding: 0 20px 12px 20px;
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

  .main-state { margin-right: 10px; }
  .main-state > ha-state-icon > ha-svg-icon { vertical-align: middle; }
  .main-icon { vertical-align: middle; font-size: 30px; }

  .title { min-height: 32px; display:inline-flex; align-items:center; }

  .clickable { cursor: pointer; }

  .content-left   { justify-content: left; }
  .content-center { justify-content: center; }
  .content-right  { justify-content: right; }
`;
