import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../../services/AuthService";

// Guards every page that needs a logged-in user. Because it wraps the shared
// layout route in App.jsx, typing a protected URL directly into the address
// bar is checked here too, and a logged-out visitor is sent to /login.
export default function ProtectedRoute({ children }) {
  if (!getCurrentUser()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
