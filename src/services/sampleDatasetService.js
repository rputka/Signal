import { createDataset } from "../models/DatasetModel";
import { createDataRecords } from "../models/DataRecordModel";
import { getColumns, getColumnTypes } from "./dataAnalysisService";
import financeSample from "../data/financeSample.json";

// Lets the UI recognize the demo dataset once it exists in Parse.
export const SAMPLE_FILE_NAME = financeSample.fileName;

export async function seedSampleDataset() {
  const rows = financeSample.rows;

  const dataset = await createDataset({
    name: financeSample.name,
    description: financeSample.description,
    fileName: financeSample.fileName,
    columns: getColumns(rows),
    columnTypes: getColumnTypes(rows),
    rowCount: rows.length,
  });

  await createDataRecords(dataset, rows);

  return dataset.id;
}
