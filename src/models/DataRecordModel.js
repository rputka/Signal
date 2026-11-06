import Parse, { assertParseConfigured } from "../config/parse";
import { datasetPointer } from "./DatasetModel";

export const DataRecord = Parse.Object.extend("DataRecord");

const MAX_RECORDS = 1000;

export async function getRecordsForDataset(datasetId) {
  assertParseConfigured();

  const query = new Parse.Query(DataRecord);
  query.equalTo("dataset", datasetPointer(datasetId));
  query.ascending("rowIndex");
  query.limit(MAX_RECORDS);

  const results = await query.find();
  return results.map((record) => record.get("values"));
}

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
