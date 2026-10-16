# Changelog

All notable changes to Signal are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-10-16

### Added
- Local Vite + React development environment (`npm run dev`)
- Client-side routing with React Router: `/`, `/datasets/:datasetId`, `/about`, and a 404 fallback
- Parse SDK initialization in `src/config/parse.js` using environment variables (`.env.example`)
- `Dataset` Parse model (`src/models/DatasetModel.js`)
- `DataRecord` Parse model (`src/models/DataRecordModel.js`) with a Pointer to its Dataset (one-to-many)
- Parse-backed asynchronous loading with loading and error states
- "Add sample dataset" action that seeds demo finance data through the generic models
- Navigation bar, DatasetCard, StatusMessage components
- Min / max / total stats in analysis results
- Component tree diagram (`docs/component-tree.md`) and UML diagram (`docs/uml.md`)

### Changed
- Migrated the Feature 3 Preact/HTM components to React JSX
- Split the old data service: pure analysis helpers moved to `dataAnalysisService.js`, persistence moved to Parse models
- Numeric columns are detected across all rows, and the default metric is the first numeric column instead of a hardcoded field
- Header copy is now passed as props so it works for any dataset

### Removed
- CDN-loaded Preact/HTM and Axios
- JSON-file data path (`public/data/data.json`, `dataService.js`)

## [0.1.0] - Feature 3

### Added
- Initial Signal analytics interface built with Preact
- Component architecture (DashboardHeader, DatasetSummary, ColumnSelector, AnalysisQuestion, DatasetPreview)
- Asynchronous JSON dataset loading through a custom data service
- Dataset summary, preview table, and numeric-column analysis controls
