const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTALBE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log({ table });

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=0`,
        })
        .firstPage();

      console.log({ findCoffeeStoreRecords });

      if (findCoffeeStoreRecords.length > 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });

        res.json(records);
      } else {
        // creating a record
        res.json({ message: 'Creating a record' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export default createCoffeeStore;
