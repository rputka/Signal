// Dropdown of numeric columns. Data comes down as props; the selection goes
// back up to the page through onColumnChange (data down, events up).
export function ColumnSelector({ columns, selectedColumn, onColumnChange }) {
  return (
    <label className="field-group">
      <span className="field-label">Metric</span>

      <select
        value={selectedColumn}
        onChange={(event) => onColumnChange(event.target.value)}
        disabled={columns.length === 0}
      >
        {columns.length === 0 && <option value="">No numeric columns</option>}

        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
    </label>
  );
}
