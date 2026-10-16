# Signal

Signal is a general-purpose dataset analysis application built with React, Vite, React Router, and Parse (Back4App).

## Team Members

- Zenidene El Farissi - Student A
- Ryan Putka - Student B

## Project

Signal lets users explore structured datasets without tying the app to one domain. Every dataset is stored as one `Dataset` (metadata) plus many `DataRecord`s (rows with a generic `values` object), so finance, sports, manufacturing or survey data all fit the same model.

The current demo seeds a sample finance dataset, but nothing in the code or schema is finance-specific.

## Running Locally

```bash
npm install
cp .env.example .env.local   # then fill in your Back4App keys
npm run dev
```

On first run the dataset list is empty. Click **Add sample dataset** to seed the demo data into Parse; the app then routes to it.

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Feature 4: Routing & Parse

Feature 4 upgrades Signal from the Feature 3 Preact/JSON prototype in CodeSandbox to a local React + Vite app backed by Parse.

### Routes

Routing is initialized in `src/main.jsx` (`BrowserRouter`) and defined in `src/App.jsx` (`Routes`).

| Path | Page | Purpose |
|---|---|---|
| `/` | `DatasetListPage` | Lists all Datasets from Parse; seeds the sample dataset |
| `/datasets/:datasetId` | `DatasetAnalysisPage` | Loads one Dataset and its DataRecords; analysis UI |
| `/about` | `AboutPage` | Project and team info |
| `*` | `NotFoundPage` | Fallback for unknown URLs |

`DatasetCard` links route from `/` to `/datasets/:datasetId`; the navigation bar links to `/` and `/about`.

### Data Model

- **Dataset**: name, description, fileName, columns, columnTypes, rowCount
- **DataRecord**: `dataset` (Pointer to Dataset), rowIndex, values (Object)
- One Dataset has many DataRecords (pointer stored on the "many" side)

See [docs/uml.md](docs/uml.md) for the UML diagram and [docs/component-tree.md](docs/component-tree.md) for the component tree.

### Architecture

```
src/
  config/parse.js                  Parse initialization (env vars)
  models/DatasetModel.js           All Dataset queries
  models/DataRecordModel.js        All DataRecord queries
  services/dataAnalysisService.js  Pure analysis helpers (no Parse)
  services/sampleDatasetService.js Seeds the demo dataset via the models
  pages/                           One component per route
  components/analytics/            Dashboard building blocks
  components/datasets/             DatasetCard
  components/layout/               Navigation, StatusMessage
  data/financeSample.json          Demo rows (illustrative values)
```

All Parse queries live in `src/models`. Pages call model functions inside `useEffect`, track loading and error state, and pass plain data down to stateless components.

## Student A Responsibilities (Feature 4)

- UML diagram
- Parse initialization
- Dataset and DataRecord Parse models

## Student B Responsibilities (Feature 4)

- Vite build system
- React Router routing
- Component tree diagram

## Future Work

- Upload custom CSV/JSON datasets
- More analysis methods (correlation, grouping)
- Charts and visualizations
- AI-assisted dataset questions and analysis
