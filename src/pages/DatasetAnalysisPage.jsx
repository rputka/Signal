import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDatasetById } from "../models/DatasetModel";
import { getRecordsForDataset } from "../models/DataRecordModel";
import {
  getColumns,
  getNumericColumns,
  summarizeColumn,
  formatColumnName,
  formatNumber,
} from "../services/dataAnalysisService";

import { DashboardHeader } from "../components/analytics/DashboardHeader.jsx";
import { DatasetSummary } from "../components/analytics/DatasetSummary.jsx";
import { ColumnSelector } from "../components/analytics/ColumnSelector.jsx";
import { AnalysisQuestion } from "../components/analytics/AnalysisQuestion.jsx";
import { DatasetPreview } from "../components/analytics/DatasetPreview.jsx";
import { StatusMessage } from "../components/layout/StatusMessage.jsx";

// Route "/datasets/:datasetId". Keying the inner view by the id gives each
// dataset a fresh state, so moving between datasets never shows stale rows.
export default function DatasetAnalysisPage() {
  const { datasetId } = useParams();
  return <DatasetAnalysisView key={datasetId} datasetId={datasetId} />;
}

// Stateful parent: loads one Dataset and its DataRecords from Parse, then
// passes plain data down to the stateless analytics components.
function DatasetAnalysisView({ datasetId }) {
  const [dataset, setDataset] = useState(null);
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  // User interaction state.
  const [selectedColumn, setSelectedColumn] = useState("");
  const [question, setQuestion] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  // Loads the dataset metadata and its records in parallel.
  useEffect(() => {
    let ignore = false;

    Promise.all([getDatasetById(datasetId), getRecordsForDataset(datasetId)])
      .then(([datasetResult, recordResults]) => {
        if (ignore) return;
        setDataset(datasetResult);
        setRows(recordResults);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "This dataset could not be loaded.");
      })
      .finally(() => {
        if (!ignore) setIsLoaded(true);
      });

    return () => {
      ignore = true;
    };
  }, [datasetId]);

  // Columns are always derived from the loaded rows, never hardcoded.
  const columns = dataset?.columns?.length ? dataset.columns : getColumns(rows);
  const numericColumns = getNumericColumns(rows);

  // Default to the first numeric column until the user picks one.
  const activeColumn = numericColumns.includes(selectedColumn)
    ? selectedColumn
    : numericColumns[0] || "";

  // Event from ColumnSelector.
  function handleColumnChange(column) {
    setSelectedColumn(column);
    setAnalysisResult(null);
  }

  // Event from AnalysisQuestion: computes stats for the chosen column.
  function handleAnalyze(event) {
    event.preventDefault();

    if (rows.length === 0 || !activeColumn) {
      return;
    }

    const summary = summarizeColumn(rows, activeColumn);

    setAnalysisResult({
      headline: `Average ${formatColumnName(activeColumn)}: ${formatNumber(summary.average)}`,
      stats: [
        { label: "Min", value: formatNumber(summary.min) },
        { label: "Max", value: formatNumber(summary.max) },
        { label: "Total", value: formatNumber(summary.total) },
        { label: "Values", value: summary.count },
      ],
      question: question.trim(),
    });
  }

  return (
    <>
      <DashboardHeader
        eyebrow="DATASET"
        title={dataset ? dataset.name : error ? "Dataset not found" : "Loading dataset"}
        subtitle={dataset?.fileName ? `Source file: ${dataset.fileName}` : ""}
        ready={isLoaded && !error}
        status={isLoaded ? (error ? "Unavailable" : `${rows.length} records ready`) : "Loading data"}
      />

      {!isLoaded && <StatusMessage>Loading records from Parse...</StatusMessage>}

      {error && (
        <StatusMessage type="error">
          {error} <Link to="/">Back to datasets</Link>
        </StatusMessage>
      )}

      {isLoaded && !error && (
        <section className="dashboard-layout">
          <DatasetSummary
            rows={rows}
            columns={columns}
            numericColumns={numericColumns}
            description={dataset.description}
          />

          <section className="analysis-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">EXPLORE</p>
                <h2>Ask something about the data</h2>
              </div>

              <span className="panel-number">01</span>
            </div>

            <ColumnSelector
              columns={numericColumns}
              selectedColumn={activeColumn}
              onColumnChange={handleColumnChange}
            />

            <AnalysisQuestion
              question={question}
              onQuestionChange={setQuestion}
              onAnalyze={handleAnalyze}
              result={analysisResult}
            />
          </section>

          <DatasetPreview rows={rows} columns={columns} />
        </section>
      )}
    </>
  );
}
