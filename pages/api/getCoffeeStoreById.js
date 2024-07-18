import { table, getMinifiedRecords } from '../../lib/airtable';

const getCoffeeStoresById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length > 0) {
        res.json(getMinifiedRecords(findCoffeeStoreRecords));
      } else {
        res.status(404).json({ message: 'No store found' });
      }
    } else {
      res.status(400).json({ message: 'Please provide an id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving a coffee store', error });
  }
};

// const getCoffeeStoresById = async (req, res) => {
//   const { id } = req.query;

//   !id && res.status(400).json({ message: 'Please provide an id' });

//   const findCoffeeStoreRecords = await table
//     .select({
//       filterByFormula: `id="${id}"`,
//     })
//     .firstPage();

//   !findCoffeeStoreRecords.length > 0 &&
//     res
//       .status(404)
//       .json({ message: 'Proble getting the store. Try again later' });

//   findCoffeeStoreRecords.length > 0 &&
//     res.json(getMinifiedRecords(findCoffeeStoreRecords));
// };

export default getCoffeeStoresById;
