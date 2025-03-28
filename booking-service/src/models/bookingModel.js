const pool = require('../config/database');

async function createBooking(user_id, event_id, tickets) {
    const result = await pool.query(
        'INSERT INTO bookings (user_id, event_id, tickets, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, event_id, tickets, 'CONFIRMED']
    );
    return result.rows[0];
}

module.exports = { createBooking };
