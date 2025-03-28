const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const { connectRabbitMQ } = require('./config/rabbitmq');
const pool = require('./config/database'); // Ensure correct import

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/bookings', bookingRoutes); // Correctly set up the routes

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
    console.log(`Booking Service running on port ${PORT}`);
    await connectRabbitMQ();

    // Ensure database is properly connected
    pool.query('SELECT 1')
        .then(() => console.log('Connected to the database'))
        .catch(err => {
            console.error('Database connection error:', err);
            process.exit(-1);
        });
});
