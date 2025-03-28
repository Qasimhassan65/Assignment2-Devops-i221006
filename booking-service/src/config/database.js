const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const initDatabase = async () => {
    try {
        const res = await pool.query(
            `SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'bookings'
            );`
        );

        if (!res.rows[0].exists) {
            console.log('Table "bookings" does not exist. Running init.sql...');
            const initSqlPath = path.resolve(__dirname, '../../sql/init.sql'); // Adjusted path
            const initSql = fs.readFileSync(initSqlPath, 'utf-8');
            await pool.query(initSql);
            console.log('Database initialized.');
        } else {
            console.log('Table "bookings" already exists.');
        }
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

pool.on('connect', async () => {
    console.log('Connected to the database');
    console.log(`Database URL: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    
    await initDatabase(); // Run initialization check

    console.log('Database setup complete.');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;
