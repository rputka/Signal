# Changelog

All notable changes to Signal are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [0.3.0] - 2026-11-06

### Added
- Parse user registration, login and logout in a separate service (`src/services/AuthService.js`)
- `AuthLogin` and `AuthRegister` pages built on a shared `AuthForm` component
- `ProtectedRoute`: every page except `/login` and `/register` requires a logged-in user; logged-out visitors, including ones typing a protected URL, are redirected to `/login`
- `PublicRoute`: logged-in users who open `/login` or `/register` are redirected to `/`
- Log out button in the navigation bar
- Submit button is disabled while a login or registration request is running

### Changed
- Protected pages share an `AppLayout` route (navigation plus `Outlet`)
- Unknown URLs show `NotFoundPage` inside the protected layout
- Component tree diagram updated for the auth routes

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
