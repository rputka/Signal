import Parse, { assertParseConfigured } from "../config/parse";

export const Dataset = Parse.Object.extend("Dataset");

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

export function datasetPointer(datasetId) {
  return Dataset.createWithoutData(datasetId);
}
