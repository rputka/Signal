import {
    html
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  // Collects a user's analysis question and sends events back to App.
  export function AnalysisQuestion({
    question,
    onQuestionChange,
    onAnalyze,
    result
  }) {
    return html`
      <form
        class="analysis-form"
        onSubmit=${onAnalyze}
      >
        <label class="field-group">
          <span class="field-label">
            Question
          </span>
  
          <input
            type="text"
            value=${question}
            placeholder="What stands out in this dataset?"
            onInput=${(event) =>
              onQuestionChange(event.target.value)}
          />
        </label>
  
        <div class="form-bottom">
          <p class="input-hint">
            Future versions could route this question to
            an AI analysis agent.
          </p>
  
          <button
            class="analyze-button"
            type="submit"
          >
            Analyze metric
            <span>→</span>
          </button>
        </div>
  
        ${
          result &&
          html`
            <div class="analysis-result">
              <span class="result-label">
                RESULT
              </span>
  
              <strong>${result}</strong>
  
              ${
                question &&
                html`
                  <p>
                    Question:
                    “${question}”
                  </p>
                `
              }
            </div>
          `
        }
      </form>
    `;
  }