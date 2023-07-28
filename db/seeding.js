const pool = require('../config/config');
const fs = require('fs');

const seedQuery = fs.readFileSync('db/seeding.sql', { encoding: 'utf-8' });

pool.query(seedQuery, (err, res) => {
    console.log(err, res);
    console.log('Seeding Complete');
    pool.end();
});