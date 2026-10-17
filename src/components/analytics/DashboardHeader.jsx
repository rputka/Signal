// Presentational hero at the top of a page. Copy is passed in as props so
// the same header works for the dataset list and for any single dataset.
export function DashboardHeader({ eyebrow, title, subtitle, status, ready }) {
  return (
    <header className="dashboard-header">
      <div className="header-copy">
        <p className="eyebrow">{eyebrow}</p>

        <h1>{title}</h1>

        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      <div className="header-status">
        <span className={ready ? "status-dot active" : "status-dot"}></span>
        <span>{status}</span>
      </div>
    </header>
  );
}
