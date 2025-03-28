const amqp = require('amqplib/callback_api');
require('dotenv').config();

let channel = null;

const connectRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
            if (err) {
                console.error('Failed to connect to RabbitMQ:', err);
                return reject(err);
            }
            connection.createChannel((err, ch) => {
                if (err) {
                    console.error('Failed to create RabbitMQ channel:', err);
                    return reject(err);
                }
                channel = ch;
                console.log('Connected to RabbitMQ');
                resolve();
            });
        });
    });
};

const getChannel = () => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    return channel;
};

module.exports = { connectRabbitMQ, getChannel };