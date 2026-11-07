import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../../services/AuthService";

// Wraps the login and register pages. A user who is already logged in has no
// reason to see them, so they are sent to the dataset list instead.
export default function PublicRoute({ children }) {
  if (getCurrentUser()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
