// Shared loading / error banner so every page handles async states the same way.
export function StatusMessage({ type = "loading", children }) {
  if (type === "error") {
    return <section className="error-message">{children}</section>;
  }

  return (
    <section className="status-message">
      <span className="status-dot"></span>
      {children}
    </section>
  );
}
