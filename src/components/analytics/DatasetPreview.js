import {
    html
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  // Renders a small preview of the dataset.
  export function DatasetPreview({ data }) {
    if (data.length === 0) {
      return null;
    }
  
    const columns = Object.keys(data[0]);
  
    return html`
      <section class="preview-section">
  
        <div class="section-title-row">
          <div>
            <p class="eyebrow">RAW DATA</p>
            <h2>Dataset preview</h2>
          </div>
  
          <span class="preview-count">
            Showing ${data.length} rows
          </span>
        </div>
  
        <div class="table-shell">
          <table>
            <thead>
              <tr>
                ${columns.map(
                  (column) =>
                    html`
                      <th key=${column}>
                        ${column}
                      </th>
                    `
                )}
              </tr>
            </thead>
  
            <tbody>
              ${data.map(
                (row, index) =>
                  html`
                    <tr key=${index}>
                      ${columns.map(
                        (column) =>
                          html`
                            <td key=${column}>
                              ${
                                typeof row[column] === "number"
                                  ? row[column].toLocaleString()
                                  : row[column]
                              }
                            </td>
                          `
                      )}
                    </tr>
                  `
              )}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }