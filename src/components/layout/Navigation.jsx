import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/AuthService";

// Persistent top bar rendered on every protected route. NavLink adds an
// "active" class to the link for the current page.
export function Navigation() {
  const navigate = useNavigate();

  // Always leave for /login, even if the logout request itself fails.
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <nav className="site-nav">
      <Link to="/" className="brand-lockup">
        <div className="brand-mark">S</div>

        <div>
          <p className="brand-name">Signal</p>
          <p className="brand-description">Dataset explorer</p>
        </div>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className="nav-link">
          Datasets
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About
        </NavLink>

        <button type="button" className="secondary-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}
