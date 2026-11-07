import { Link } from "react-router-dom";

import AuthForm from "./AuthForm.jsx";
import { register } from "../../services/AuthService";

export default function AuthRegister() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <AuthForm
          title="Register"
          onSubmit={register}
          passwordAutoComplete="new-password"
        />
        <Link to="/login" className="auth-switch">
          Already have an account? Log in
        </Link>
      </section>
    </main>
  );
}
