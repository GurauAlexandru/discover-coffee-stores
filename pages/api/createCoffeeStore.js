import { table, getMinifiedRecords } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { name, address, region, voting, id, imgUrl } = req.body;

    if (id) {
      try {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length > 0) {
          res.json(getMinifiedRecords(findCoffeeStoreRecords));
        } else {
          // creating a record
          if (name) {
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

            res.json(getMinifiedRecords(createRecords));
          } else {
            res.status(400).json({ message: 'Please provide a name' });
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating or finding a store' });
      }
    } else {
      res.status(400).json({ message: 'Error creating or finding a store' });
    }
  }
};

export default createCoffeeStore;
