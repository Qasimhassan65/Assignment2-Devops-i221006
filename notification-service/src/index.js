const express = require('express');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;
const RABBITMQ_URL = "amqp://localhost";
const MONGO_URI ="mongodb://localhost:27017/notifications;"

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Notification Schema
const notificationSchema = new mongoose.Schema({
    booking_id: String,
    user_email: String,
    status: String,
    timestamp: { type: Date, default: Date.now }
});
const Notification = mongoose.model('Notification', notificationSchema);

// RabbitMQ Connection and Listener
async function startRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'booking_notifications';
        
        await channel.assertQueue(queue, { durable: true });
        console.log(`Listening for messages in ${queue}`);
        
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const notificationData = JSON.parse(msg.content.toString());
                console.log('Received Notification:', notificationData);
                
                // Save to Database
                const notification = new Notification(notificationData);
                await notification.save();
                console.log('Notification saved to database');
                
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
    }
}

startRabbitMQ();

// Start Server
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});