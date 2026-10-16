import { formatNumber } from "../../services/dataAnalysisService";

// Renders a table of the dataset. Columns are passed in from the page, so the
// table adapts to any structure instead of assuming specific fields.
export function DatasetPreview({ rows, columns }) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="preview-section">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">RAW DATA</p>
          <h2>Dataset preview</h2>
        </div>

        <span className="preview-count">Showing {rows.length} rows</span>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>
                    {typeof row[column] === "number"
                      ? formatNumber(row[column])
                      : row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
