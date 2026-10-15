import {
    html,
    render,
    useEffect,
    useState
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  import { DashboardHeader } from "./components/analytics/DashboardHeader.js";
  import { DatasetSummary } from "./components/analytics/DatasetSummary.js";
  import { ColumnSelector } from "./components/analytics/ColumnSelector.js";
  import { AnalysisQuestion } from "./components/analytics/AnalysisQuestion.js";
  import { DatasetPreview } from "./components/analytics/DatasetPreview.js";
  
  import { 
    getDataset,
    getNumericColumns,
    getAverage
  } from "./services/dataService.js";

  import "./App.css";
  
  function App() {
    // Stores the dataset after the asynchronous request finishes.
    const [data, setData] = useState([]);
  
    // Used so the interface knows when the data is ready to display.
    const [isLoaded, setIsLoaded] = useState(false);
  
    // Stores an error if the dataset cannot be retrieved.
    const [error, setError] = useState("");
  
    // Student A interaction state.
    const [selectedColumn, setSelectedColumn] = useState("revenue");
    const [question, setQuestion] = useState("");
    const [analysisResult, setAnalysisResult] = useState("");
  
    // Loads the dataset once when the application first starts.
    useEffect(() => {
      getDataset()
        .then((result) => {
          setData(result);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setError("The dataset could not be loaded.");
          setIsLoaded(true);
        });
    }, []);
  
    // Event received from the child ColumnSelector component.
    function handleColumnChange(column) {
      setSelectedColumn(column);
      setAnalysisResult("");
    }
  
    // Event received from the child AnalysisQuestion component.
    function handleQuestionChange(value) {
      setQuestion(value);
    }
  
    // Performs one simple analysis using the selected numeric column.
    function handleAnalyze(event) {
      event.preventDefault();
  
      if (data.length === 0) {
        return;
      }
  
      const average = getAverage(data, selectedColumn);
  
      const formattedColumn = selectedColumn
        .replace(/([A-Z])/g, " $1")
        .toLowerCase();
  
      setAnalysisResult(
        `Average ${formattedColumn}: ${average.toLocaleString(undefined, {
          maximumFractionDigits: 2
        })}`
      );
    }
  
    const numericColumns = getNumericColumns(data);
  
    return html`
      <main class="page-shell">
        <${DashboardHeader}
          recordCount=${data.length}
          loaded=${isLoaded}
        />
  
        ${
          !isLoaded &&
          html`
            <section class="status-message">
              <span class="status-dot"></span>
              Loading dataset...
            </section>
          `
        }
  
        ${
          error &&
          html`
            <section class="error-message">
              ${error}
            </section>
          `
        }
  
        ${
          isLoaded &&
          !error &&
          html`
            <section class="dashboard-layout">
  
              <${DatasetSummary}
                data=${data}
                numericColumns=${numericColumns}
              />
  
              <section class="analysis-panel">
                <div class="panel-heading">
                  <div>
                    <p class="eyebrow">EXPLORE</p>
                    <h2>Ask something about the data</h2>
                  </div>
  
                  <span class="panel-number">01</span>
                </div>
  
                <${ColumnSelector}
                  columns=${numericColumns}
                  selectedColumn=${selectedColumn}
                  onColumnChange=${handleColumnChange}
                />
  
                <${AnalysisQuestion}
                  question=${question}
                  onQuestionChange=${handleQuestionChange}
                  onAnalyze=${handleAnalyze}
                  result=${analysisResult}
                />
              </section>
  
              <${DatasetPreview}
                data=${data}
              />
  
            </section>
          `
        }
      </main>
    `;
  }
  
  render(
    html`<${App} />`,
    document.getElementById("app")
  );