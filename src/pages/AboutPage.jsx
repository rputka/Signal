// Route "/about": static description of the project and team.
export default function AboutPage() {
  return (
    <section className="content-page">
      <p className="eyebrow">ABOUT</p>
      <h1>Signal</h1>

      <p>
        Signal is a general-purpose dataset analysis app. Any structured
        dataset is stored as one <strong>Dataset</strong> (its metadata) and
        many <strong>DataRecords</strong> (its rows), so the same app can
        explore finance, sports, manufacturing or survey data without a schema
        change.
      </p>

      <p>
        Built with React, Vite, React Router and Parse (Back4App) for CSE 40693
        Modern Web Development by Zenidene El Farissi (Student A) and Ryan
        Putka (Student B).
      </p>

      <h2>Coming next</h2>
      <ul>
        <li>Uploading your own CSV or JSON datasets</li>
        <li>More analysis methods (correlation, grouping)</li>
        <li>Charts and visualizations</li>
        <li>AI-assisted questions about a dataset</li>
      </ul>
    </section>
  );
}
