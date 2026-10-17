import { Link } from "react-router-dom";

// One dataset in the list. Clicking it routes to /datasets/:datasetId.
export function DatasetCard({ dataset }) {
  return (
    <Link to={`/datasets/${dataset.id}`} className="dataset-card">
      <div className="dataset-card-top">
        <span className="summary-label">{dataset.fileName || "DATASET"}</span>
        <span className="dataset-card-arrow">→</span>
      </div>

      <h3>{dataset.name}</h3>

      {dataset.description && <p>{dataset.description}</p>}

      <div className="dataset-card-meta">
        <span>{dataset.rowCount} rows</span>
        <span>{dataset.columns.length} columns</span>
      </div>
    </Link>
  );
}
