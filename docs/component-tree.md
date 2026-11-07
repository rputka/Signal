# Signal Component Tree (Feature 5)

Arrows point from a parent to the children it renders. Pages are chosen by
React Router based on the URL. Data flows **down** as props; user events flow
**up** through callbacks (`onColumnChange`, `onQuestionChange`, `onAnalyze`).

```mermaid
flowchart TD
  main["main.jsx<br/>createRoot + BrowserRouter"] --> App
  App --> Routes["Routes"]

  Routes -->|"/login"| PublicLogin["PublicRoute"] --> AuthLogin --> AF1["AuthForm"]
  Routes -->|"/register"| PublicRegister["PublicRoute"] --> AuthRegister --> AF2["AuthForm"]

  Routes --> ProtectedRoute --> AppLayout
  AppLayout --> Navigation
  AppLayout -->|"/"| DatasetListPage
  AppLayout -->|"/datasets/:datasetId"| DatasetAnalysisPage
  AppLayout -->|"/about"| AboutPage
  AppLayout -->|"*"| NotFoundPage

  DatasetListPage --> H1["DashboardHeader"]
  DatasetListPage --> S1["StatusMessage"]
  DatasetListPage --> DatasetCard["DatasetCard (one per Dataset)"]

  DatasetAnalysisPage --> DatasetAnalysisView["DatasetAnalysisView<br/>(stateful, keyed by datasetId)"]
  DatasetAnalysisView --> H2["DashboardHeader"]
  DatasetAnalysisView --> S2["StatusMessage"]
  DatasetAnalysisView --> DatasetSummary
  DatasetAnalysisView --> ColumnSelector
  DatasetAnalysisView --> AnalysisQuestion
  DatasetAnalysisView --> DatasetPreview
```

## Where data comes from

```
DatasetListPage      --getAllDatasets()-------------> DatasetModel    --Parse.Query--> Back4App
DatasetAnalysisView  --getDatasetById(id)-----------> DatasetModel    --Parse.Query--> Back4App
DatasetAnalysisView  --getRecordsForDataset(id)-----> DataRecordModel --Parse.Query--> Back4App
DatasetAnalysisView  --summarizeColumn(rows, col)---> dataAnalysisService (pure math, no Parse)
```

Components never create a `Parse.Query`; they only call model functions.

![Component tree](component-tree.png)
