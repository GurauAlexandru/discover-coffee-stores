// pat5GiO6AHaQ8PTjQ.4ab55060668b3ad11a322426bc218fd2d9d58769f3f6691c1df5b5028ec57eb9

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTALBE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('Coffee Stores');

console.log({ table });

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'Create Coffee Store' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default createCoffeeStore;
