const axios = window.axios;

// Loads the sample dataset fom data.json
export function getDataset() {
  return axios
    .get("/data/data.json")
    .then((response) => {
      return response.data;
    });
}

// Reads a JSON dataset from a file the user uploads
export function getUploadedDataset(file) {
  const fileUrl = URL.createObjectURL(file);

  return axios
    .get(fileUrl)
    .then((response) => {
      URL.revokeObjectURL(fileUrl);

      return response.data;
    })
}

// Returns the names of columns that hold numbers, based on the first row
export function getNumericColumns(data) {
  if (data.length == 0) {
    return [];
  }

  return Object.keys(data[0]).filter((key) => {
    return typeof data[0][key] == "number";
  });
}

// Pulls every value from one column into an array
export function getColumnValues(data, column) {
  return data.map((row) => row[column]);
}

// Adds up every value in a numeric column
export function getTotal(data, column) {
  const values = getColumnValues(data, column);

  return values.reduce((sum, value) => {
    return sum + value;
  }, 0);
}

// Returns average of a numberic column
export function getAverage(data, column) {
  return getTotal(data, column) / data.length;
}

// Returns smallest value in a numeric column
export function getMin(data, column) {
  const values = getColumnValues(data, column);
  let min = values[0];
  
  for (const value of values) {
    if (value < min) {
      min = value;
    }
  }

  return min;
}

// Returns largest value in a numeric column
export function getMax(data, column) {
  const values = getColumnValues(data, column);
  let max = values[0];
  
  for (const value of values) {
    if (value > max) {
      max = value;
    }
  }

  return max;
}
