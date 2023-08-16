import { BigQuery } from "@google-cloud/bigquery";

// Creates a client
const bigquery = new BigQuery({
  projectId: "project-id",
  keyFilename: "./iam.json",
});

const options = {
  query: "SELECT sum(pageviews) AS PV FROM `table` ORDER BY PV DESC",
  location: "US",
};

// query();
async function query() {
  // Runs the query
  const [rows] = await bigquery.query(options);
  console.log(`Query returned ${rows.length} rows.`);
  rows.forEach((row) => console.log(row));
}
