import Parse, { assertParseConfigured } from "../config/parse";

/*
 * Dataset Parse model.
 *
 * A Dataset holds metadata about one structured dataset: its name, the file
 * it came from, its column names and how many rows it has. The rows
 * themselves live in the DataRecord class (see DataRecordModel.js), and each
 * DataRecord points back to its Dataset. Nothing here assumes a domain, so a
 * finance, sports or survey dataset all fit the same class.
 *
 * Every Parse query on the Dataset class lives in this file. Components only
 * call the exported functions and receive plain JavaScript objects back.
 */
export const Dataset = Parse.Object.extend("Dataset");

// Converts a Parse object into a plain object so components never depend on
// the Parse API (dataset.get(...)) directly.
function toPlainDataset(dataset) {
  return {
    id: dataset.id,
    name: dataset.get("name"),
    description: dataset.get("description") || "",
    fileName: dataset.get("fileName") || "",
    columns: dataset.get("columns") || [],
    columnTypes: dataset.get("columnTypes") || {},
    rowCount: dataset.get("rowCount") || 0,
    createdAt: dataset.createdAt,
    updatedAt: dataset.updatedAt,
  };
}

// READ: every dataset, newest first.
export async function getAllDatasets() {
  assertParseConfigured();

  const query = new Parse.Query(Dataset);
  query.descending("createdAt");

  const results = await query.find();
  return results.map(toPlainDataset);
}

// READ: one dataset by its objectId (used by the /datasets/:datasetId route).
export async function getDatasetById(datasetId) {
  assertParseConfigured();

  const query = new Parse.Query(Dataset);
  const dataset = await query.get(datasetId);

  return toPlainDataset(dataset);
}

// CREATE: saves dataset metadata and returns the saved Parse object, which
// DataRecordModel needs so each record can point to it.
export async function createDataset({
  name,
  description,
  fileName,
  columns,
  columnTypes,
  rowCount,
}) {
  assertParseConfigured();

  const dataset = new Dataset();

  dataset.set("name", name);
  dataset.set("description", description);
  dataset.set("fileName", fileName);
  dataset.set("columns", columns);
  dataset.set("columnTypes", columnTypes);
  dataset.set("rowCount", rowCount);

  return dataset.save();
}

// Builds an unsaved reference to an existing Dataset. Used to filter
// DataRecords by pointer without re-downloading the Dataset itself.
export function datasetPointer(datasetId) {
  return Dataset.createWithoutData(datasetId);
}

// TODO (future work): updateDataset() for renaming, and deleteDataset() that
// also removes the dataset's DataRecords once uploads are supported.
