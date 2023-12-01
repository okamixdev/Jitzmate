const db = require('./connection');
const { Belt } = require('../models/index');

const beltData = require('./seeds/beltsData.json');

db.once('open', async () => {
    await Belt.deleteMany({});

    const belts = await Belt.insertMany(beltData);
    console.log('Seeding completed!!')

    process.exit(0);
});