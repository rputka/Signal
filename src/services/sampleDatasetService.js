import { createDataset } from "../models/DatasetModel";
import { createDataRecords } from "../models/DataRecordModel";
import { getColumns, getColumnTypes } from "./dataAnalysisService";
import financeSample from "../data/financeSample.json";

/*
 * Seeds the demo dataset into Parse.
 *
 * Finance is ONLY the sample data. It goes through the same generic
 * Dataset/DataRecord models any uploaded dataset will use, so swapping in a
 * sports or survey file needs no schema change. This file contains no Parse
 * queries itself; it only calls model functions.
 */
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

// TODO (future work): seedFromFile(file) that parses a user's CSV/JSON upload
// and calls the same two model functions.
