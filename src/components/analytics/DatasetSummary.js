import {
    html
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  // Displays basic information about the loaded dataset.
  export function DatasetSummary({ data, numericColumns }) {
    const fieldCount =
      data.length > 0
        ? Object.keys(data[0]).length
        : 0;
  
    return html`
      <section class="summary-section">
        <div class="section-title-row">
          <div>
            <p class="eyebrow">DATASET</p>
            <h2>Overview</h2>
          </div>
  
          <p class="section-description">
            A quick look at the structure of the current sample dataset.
          </p>
        </div>
  
        <div class="summary-grid">
  
          <div class="summary-card">
            <span class="summary-label">Records</span>
            <strong>${data.length}</strong>
            <span class="summary-detail">rows loaded</span>
          </div>
  
          <div class="summary-card">
            <span class="summary-label">Fields</span>
            <strong>${fieldCount}</strong>
            <span class="summary-detail">columns available</span>
          </div>
  
          <div class="summary-card">
            <span class="summary-label">Numeric</span>
            <strong>${numericColumns.length}</strong>
            <span class="summary-detail">measurable fields</span>
          </div>
  
        </div>
      </section>
    `;
  }