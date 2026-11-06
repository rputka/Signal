import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import AuthLogin from "./components/auth/AuthLogin.jsx";
import AuthRegister from "./components/auth/AuthRegister.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { Navigation } from "./components/layout/Navigation.jsx";
import DatasetListPage from "./pages/DatasetListPage.jsx";
import DatasetAnalysisPage from "./pages/DatasetAnalysisPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import "./App.css";

// Shell for the protected pages: the navigation with the page below it.
function AppLayout() {
  return (
    <div className="page-shell">
      <Navigation />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Defines every route. All except /login and /register require a logged-in user.
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/register" element={<AuthRegister />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DatasetListPage />} />
        <Route path="/datasets/:datasetId" element={<DatasetAnalysisPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
