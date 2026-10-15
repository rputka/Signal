import {
    html
  } from "https://unpkg.com/htm/preact/standalone.module.js";
  
  // Presentational component for the top of the application.
  export function DashboardHeader({ recordCount, loaded }) {
    return html`
      <header class="dashboard-header">
        <div class="brand-lockup">
          <div class="brand-mark">
            S
          </div>
  
          <div>
            <p class="brand-name">Signal</p>
            <p class="brand-description">Dataset explorer</p>
          </div>
        </div>
  
        <div class="header-copy">
          <p class="eyebrow">DATA WORKSPACE</p>
  
          <h1>
            Find the signal<br />
            inside your data.
          </h1>
  
          <p class="header-subtitle">
            Explore a sample business dataset, inspect its structure,
            and run lightweight analysis without leaving the browser.
          </p>
        </div>
  
        <div class="header-status">
          <span class=${loaded ? "status-dot active" : "status-dot"}></span>
  
          <span>
            ${loaded ? `${recordCount} records ready` : "Loading data"}
          </span>
        </div>
      </header>
    `;
  }