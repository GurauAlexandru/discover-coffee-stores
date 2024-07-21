import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from '../../lib/airtable';

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.body;

      if (id) {
        const records = await findRecordByFilter(id);

        const record = records[0];

        const calculatedVoting = parseInt(record.voting) + 1;

        // update a record
        const updatedRecord = await table.update([
          {
            id: record.recordId,
            fields: { voting: calculatedVoting },
          },
        ]);

        !updatedRecord &&
          res.status(404).json({ message: `Record ${id} not found` });

        updatedRecord && res.json(getMinifiedRecords(updatedRecord));
      } else {
        res.status(400).json({ message: 'Please provide an id' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error upvoting our coffee store', error });
    }
  }
};

export default favouriteCoffeeStoreById;
