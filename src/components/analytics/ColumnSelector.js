import {
    html
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  // Allows the user to select a numeric variable for analysis.
  export function ColumnSelector({
    columns,
    selectedColumn,
    onColumnChange
  }) {
    return html`
      <label class="field-group">
        <span class="field-label">
          Metric
        </span>
  
        <select
          value=${selectedColumn}
          onChange=${(event) =>
            onColumnChange(event.target.value)}
        >
          ${columns.map(
            (column) =>
              html`
                <option
                  key=${column}
                  value=${column}
                >
                  ${column}
                </option>
              `
          )}
        </select>
      </label>
    `;
  }