import { Link, NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../services/AuthService";

// Top bar rendered on every protected route.
export function Navigation() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
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
