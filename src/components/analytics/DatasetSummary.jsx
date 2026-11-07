// Displays high-level structure of whatever dataset is loaded.
// Field counts are derived from the data, never from a fixed schema.
export function DatasetSummary({ rows, columns, numericColumns, description }) {
  return (
    <section className="summary-section">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">DATASET</p>
          <h2>Overview</h2>
        </div>

        <p className="section-description">
          {description || "A quick look at the structure of this dataset."}
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-label">RECORDS</span>
          <strong>{rows.length}</strong>
          <span className="summary-detail">rows loaded</span>
        </div>

        <div className="summary-card">
          <span className="summary-label">FIELDS</span>
          <strong>{columns.length}</strong>
          <span className="summary-detail">columns available</span>
        </div>

        <div className="summary-card">
          <span className="summary-label">NUMERIC</span>
          <strong>{numericColumns.length}</strong>
          <span className="summary-detail">measurable fields</span>
        </div>
      </div>
    </section>
  );
}
