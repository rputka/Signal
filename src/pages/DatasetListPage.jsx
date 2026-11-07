import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDatasets } from "../models/DatasetModel";
import { seedSampleDataset, SAMPLE_FILE_NAME } from "../services/sampleDatasetService";
import { DashboardHeader } from "../components/analytics/DashboardHeader.jsx";
import { DatasetCard } from "../components/datasets/DatasetCard.jsx";
import { StatusMessage } from "../components/layout/StatusMessage.jsx";

// Route "/": lists every Dataset stored in Parse.
export default function DatasetListPage() {
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);

  // Loads datasets asynchronously once, when the page first renders.
  // The Parse query itself lives in DatasetModel; this page only awaits it.
  useEffect(() => {
    let ignore = false;

    getAllDatasets()
      .then((results) => {
        if (!ignore) setDatasets(results);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Datasets could not be loaded.");
      })
      .finally(() => {
        if (!ignore) setIsLoaded(true);
      });

    // Prevents state updates if the user leaves before the request finishes.
    return () => {
      ignore = true;
    };
  }, []);

  // True once the demo dataset has been seeded into Parse.
  const hasSample = datasets.some((dataset) => dataset.fileName === SAMPLE_FILE_NAME);

  // Seeds the demo dataset into Parse, then routes straight to it.
  async function handleLoadSample() {
    setIsSeeding(true);
    setError("");

    try {
      const datasetId = await seedSampleDataset();
      navigate(`/datasets/${datasetId}`);
    } catch (err) {
      setError(err.message || "The sample dataset could not be created.");
      setIsSeeding(false);
    }
  }

  return (
    <>
      <DashboardHeader
        eyebrow="DATA WORKSPACE"
        title={
          <>
            Find the signal
            <br />
            inside your data.
          </>
        }
        subtitle="Pick a dataset to inspect its structure and run lightweight analysis. Signal works with any structured data, not one specific domain."
        ready={isLoaded && !error}
        status={
          isLoaded
            ? `${datasets.length} ${datasets.length === 1 ? "dataset" : "datasets"} available`
            : "Connecting to Parse"
        }
      />

      {!isLoaded && <StatusMessage>Loading datasets...</StatusMessage>}

      {error && <StatusMessage type="error">{error}</StatusMessage>}

      {isLoaded && (
        <section className="dataset-section">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">LIBRARY</p>
              <h2>Datasets</h2>
            </div>

            {/* Only offered while the demo data is missing, to avoid duplicate seeds. */}
            {!hasSample && (
              <button
                className="secondary-button"
                type="button"
                onClick={handleLoadSample}
                disabled={isSeeding}
              >
                {isSeeding ? "Adding sample..." : "Add sample dataset"}
              </button>
            )}
          </div>

          {datasets.length === 0 && !error && (
            <p className="empty-state">
              No datasets yet. Add the sample dataset to see Signal in action.
            </p>
          )}

          <div className="dataset-grid">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
