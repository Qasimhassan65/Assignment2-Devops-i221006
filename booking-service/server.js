// filepath: /Users/mc/Desktop/Devops Assignment/booking-service/src/controllers/bookingController.js
const axios = require('axios');
const pool = require('../config/db');
const { channel } = require('../config/rabbitmq');

const bookTickets = async (req, res) => {
    const { user_id, event_id, tickets, user_email } = req.body;

    try {
        // Check event availability
        const eventResponse = await axios.get(`${process.env.EVENT_SERVICE_URL}/api/events/${event_id}/availability`);
        const eventData = eventResponse.data;

        if (!eventData.available || eventData.tickets < tickets) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        // Insert Booking Record into PostgreSQL
        const result = await pool.query(
            'INSERT INTO bookings (user_id, event_id, tickets, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, event_id, tickets, 'CONFIRMED']
        );

        // Publish Message to RabbitMQ
        const notificationMessage = {
            booking_id: result.rows[0].id,
            user_email,
            status: 'CONFIRMED'
        };
        channel.sendToQueue('booking_notifications', Buffer.from(JSON.stringify(notificationMessage)));

        res.status(201).json({ message: 'Booking confirmed', booking: result.rows[0] });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { bookTickets };