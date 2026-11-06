import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StatusMessage } from "../layout/StatusMessage.jsx";

export default function AuthForm({ title, onSubmit, passwordAutoComplete }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSubmit(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <label className="field-group">
        <span className="field-label">Email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="field-group">
        <span className="field-label">Password</span>
        <input
          type="password"
          autoComplete={passwordAutoComplete}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error && <StatusMessage type="error">{error}</StatusMessage>}

      <button type="submit" className="auth-submit">
        {title}
      </button>
    </form>
  );
}
