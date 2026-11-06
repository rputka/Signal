import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../../services/AuthService";

export default function ProtectedRoute({ children }) {
  if (!getCurrentUser()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
