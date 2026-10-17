import { Link, NavLink } from "react-router-dom";

// Persistent top bar rendered on every route. NavLink adds an "active"
// class to the link for the current page.
export function Navigation() {
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
      </div>
    </nav>
  );
}
