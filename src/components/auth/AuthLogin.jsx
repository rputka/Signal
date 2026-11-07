import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";
import { login } from "../../services/AuthService";

export default function AuthLogin() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <AuthForm
          title="Log in"
          onSubmit={login}
          passwordAutoComplete="current-password"
        />
        <Link to="/register" className="auth-switch">
          No account? Register
        </Link>
      </section>
    </main>
  );
}
