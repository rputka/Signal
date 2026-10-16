import Parse, { assertParseConfigured } from "../config/parse";
import { datasetPointer } from "./DatasetModel";

/*
 * DataRecord Parse model.
 *
 * One DataRecord is one row (observation) of a Dataset. Its cells are stored
 * in a generic "values" object, so records from completely different datasets
 * share this one class:
 *
 *   { dataset: Pointer<Dataset>, rowIndex: 0, values: { ticker: "AAPL", close: 245.3 } }
 *   { dataset: Pointer<Dataset>, rowIndex: 0, values: { city: "Chicago", temperature: 72 } }
 *
 * Relationship: one Dataset has many DataRecords (1 to many). Because a
 * dataset can hold far more than 10 rows, the link is stored as a Pointer on
 * the "many" side (DataRecord.dataset) rather than as an array on Dataset.
 *
 * Every Parse query on the DataRecord class lives in this file.
 */
export const DataRecord = Parse.Object.extend("DataRecord");

// Parse returns at most 100 objects by default; raise it for small datasets.
// TODO (future work): paginate with skip() once uploaded datasets get large.
const MAX_RECORDS = 1000;

// READ: all rows that belong to one dataset, in their original order.
// Returns plain row objects, ready for the analysis components.
export async function getRecordsForDataset(datasetId) {
  assertParseConfigured();

  const query = new Parse.Query(DataRecord);
  query.equalTo("dataset", datasetPointer(datasetId));
  query.ascending("rowIndex");
  query.limit(MAX_RECORDS);

  const results = await query.find();
  return results.map((record) => record.get("values"));
}

// CREATE: saves many rows for a dataset in one batched request.
// `dataset` is the saved Parse object returned by createDataset().
export async function createDataRecords(dataset, rows) {
  assertParseConfigured();

  const records = rows.map((values, index) => {
    const record = new DataRecord();

    record.set("dataset", dataset);
    record.set("rowIndex", index);
    record.set("values", values);

    return record;
  });

  return Parse.Object.saveAll(records);
}
