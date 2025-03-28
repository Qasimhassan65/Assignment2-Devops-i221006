const express = require('express');
const { bookTickets } = require('../controllers/bookingController');
const pool = require('../config/database'); // Import the database pool

const router = express.Router();

router.post('/', bookTickets);

// Get bookings by user ID
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching bookings for user:", userId);

    try {
        const result = await pool.query(
            "SELECT * FROM bookings WHERE user_id = $1",
            [userId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
