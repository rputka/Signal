import { Link } from "react-router-dom";

// Catch-all route for any URL that does not match a defined path.
export default function NotFoundPage() {
  return (
    <section className="content-page">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>
        That page does not exist. <Link to="/">Go back to your datasets.</Link>
      </p>
    </section>
  );
}
