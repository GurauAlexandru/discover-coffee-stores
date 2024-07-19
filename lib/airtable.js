const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTALBE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const getMinigiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records) =>
  records.map((record) => getMinigiedRecord(record));

const findRecordByFilter = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};

export { table, getMinifiedRecords, findRecordByFilter };
