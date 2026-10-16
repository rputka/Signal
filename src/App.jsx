import { Route, Routes } from "react-router-dom";

import { Navigation } from "./components/layout/Navigation.jsx";
import DatasetListPage from "./pages/DatasetListPage.jsx";
import DatasetAnalysisPage from "./pages/DatasetAnalysisPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import "./App.css";

/*
 * Root component. It renders the persistent navigation and defines every
 * route in the app. BrowserRouter itself is set up in main.jsx.
 *
 *   /                      -> DatasetListPage      (all datasets from Parse)
 *   /datasets/:datasetId   -> DatasetAnalysisPage  (one dataset + its records)
 *   /about                 -> AboutPage
 *   *                      -> NotFoundPage
 */
export default function App() {
  return (
    <div className="page-shell">
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<DatasetListPage />} />
          <Route path="/datasets/:datasetId" element={<DatasetAnalysisPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
