import { Outlet, Route, Routes } from "react-router-dom";

import AuthLogin from "./components/auth/AuthLogin.jsx";
import AuthRegister from "./components/auth/AuthRegister.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import PublicRoute from "./components/auth/PublicRoute.jsx";
import { Navigation } from "./components/layout/Navigation.jsx";
import DatasetListPage from "./pages/DatasetListPage.jsx";
import DatasetAnalysisPage from "./pages/DatasetAnalysisPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

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

/*
 * Root component. BrowserRouter itself is set up in main.jsx.
 *
 *   /login, /register      -> PublicRoute    (logged-in users go to /)
 *   /                      -> DatasetListPage      } ProtectedRoute
 *   /datasets/:datasetId   -> DatasetAnalysisPage  } (logged-out users
 *   /about                 -> AboutPage            }  go to /login)
 *   *                      -> NotFoundPage         }
 */
export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthRegister />
          </PublicRoute>
        }
      />

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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
