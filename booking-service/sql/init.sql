CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id VARCHAR(24) NOT NULL,
    tickets INT NOT NULL,
    status VARCHAR(50) NOT NULL
);