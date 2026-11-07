// Collects the user's question, triggers analysis, and shows the result.
// It owns no state: every change is sent up to the parent page.
export function AnalysisQuestion({ question, onQuestionChange, onAnalyze, result }) {
  return (
    <form className="analysis-form" onSubmit={onAnalyze}>
      <label className="field-group">
        <span className="field-label">Question</span>

        <input
          type="text"
          value={question}
          placeholder="What stands out in this dataset?"
          onChange={(event) => onQuestionChange(event.target.value)}
        />
      </label>

      <div className="form-bottom">
        {/* TODO (future work): send the question to an AI analysis agent. */}
        <p className="input-hint">
          Future versions could route this question to an AI analysis agent.
        </p>

        <button className="analyze-button" type="submit">
          Analyze metric
          <span>→</span>
        </button>
      </div>

      {result && (
        <div className="analysis-result">
          <span className="result-label">RESULT</span>

          <strong>{result.headline}</strong>

          <dl className="result-stats">
            {result.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          {result.question && <p>Question: “{result.question}”</p>}
        </div>
      )}
    </form>
  );
}
