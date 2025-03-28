const axios = require('axios');
const pool = require('../config/database');
const { getChannel } = require('../config/rabbitmq');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const bookTickets = async (req, res) => {
    const { userId, eventId, tickets, email } = req.body; 

    try {
        // Check event availability
        const eventResponse = await axios.get(`${process.env.EVENT_SERVICE_URL}/api/events/${eventId}/availability`);
        const eventData = eventResponse.data;

        if (!eventData.available || eventData.tickets < tickets) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        // Insert Booking Record into PostgreSQL
        const result = await pool.query(
            'INSERT INTO bookings (user_id, event_id, tickets, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, eventId, tickets, 'CONFIRMED']
        );

        // Reduce available tickets
        await axios.post(`${process.env.EVENT_SERVICE_URL}/api/events/reduce-tickets`, {
            event_id: eventId,
            tickets
        });

        // Publish Message to RabbitMQ
        const channel = getChannel();
        const notificationMessage = {
            booking_id: result.rows[0].id,
            email,
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