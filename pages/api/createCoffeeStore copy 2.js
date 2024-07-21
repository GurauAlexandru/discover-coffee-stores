const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTALBE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { name, address, region, voting, id, imgUrl } = req.body;

    !id && res.status(400).json({ message: 'Please provide ID' });

    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length > 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });

        res.json(records);
      } else {
        // creating a record
        !name && res.status(400).json({ message: 'Please provide name' });

        const createRecords = await table.create([
          {
            fields: {
              name,
              address,
              region,
              voting,
              id,
              imgUrl,
            },
          },
        ]);

        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export default createCoffeeStore;
