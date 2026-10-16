/*
 * Pure, dataset-agnostic analysis helpers.
 *
 * These functions only take plain arrays of row objects and never talk to
 * Parse, so they work for any structured dataset. Database access lives in
 * src/models; this file is only math and column inspection.
 */

// Returns every column name that appears in the dataset, in first-seen order.
export function getColumns(rows) {
  const columns = [];

  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!columns.includes(key)) {
        columns.push(key);
      }
    }
  }

  return columns;
}

// Labels each column "number" or "string" by checking every non-empty value,
// not just the first row, so one odd row cannot mislabel a column.
export function getColumnTypes(rows) {
  const types = {};

  for (const column of getColumns(rows)) {
    const values = getColumnValues(rows, column).filter(
      (value) => value !== null && value !== undefined && value !== "",
    );

    const allNumbers =
      values.length > 0 &&
      values.every((value) => typeof value === "number" && Number.isFinite(value));

    types[column] = allNumbers ? "number" : "string";
  }

  return types;
}

// Returns only the columns that hold numbers.
export function getNumericColumns(rows) {
  const types = getColumnTypes(rows);
  return Object.keys(types).filter((column) => types[column] === "number");
}

// Pulls every value from one column into an array.
export function getColumnValues(rows, column) {
  return rows.map((row) => row[column]);
}

// Numeric values only, skipping blanks so the math below stays valid.
function getNumbers(rows, column) {
  return getColumnValues(rows, column).filter(
    (value) => typeof value === "number" && Number.isFinite(value),
  );
}

export function getTotal(rows, column) {
  return getNumbers(rows, column).reduce((sum, value) => sum + value, 0);
}

export function getAverage(rows, column) {
  const numbers = getNumbers(rows, column);
  return numbers.length === 0 ? 0 : getTotal(rows, column) / numbers.length;
}

export function getMin(rows, column) {
  const numbers = getNumbers(rows, column);
  return numbers.length === 0 ? 0 : Math.min(...numbers);
}

export function getMax(rows, column) {
  const numbers = getNumbers(rows, column);
  return numbers.length === 0 ? 0 : Math.max(...numbers);
}

// Bundles the common statistics for one column so the UI can show them together.
export function summarizeColumn(rows, column) {
  return {
    column,
    count: getNumbers(rows, column).length,
    average: getAverage(rows, column),
    min: getMin(rows, column),
    max: getMax(rows, column),
    total: getTotal(rows, column),
  };
}

// Turns "unitsSold" or "unit_price" into "units sold" / "unit price" for display.
export function formatColumnName(column) {
  return column
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
}

// Consistent number formatting across the app.
export function formatNumber(value) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// TODO (future work): correlation between two numeric columns, grouping by a
// text column, and CSV parsing for user uploads.
