-- for new Postgresql DB. Need to run with superuser!
CREATE ROLE multitlon WITH LOGIN PASSWORD 'multitlon';
ALTER ROLE multitlon CREATEDB;

-- run with 'multitlon' user
psql -d postgres -U multitlon

-- create new DB 'multitlon'
CREATE DATABASE multitlon;

CREATE TABLE exercise_metadata (
    sid VARCHAR(40) PRIMARY KEY UNIQUE,
    name VARCHAR(40) NOT NULL,
    item VARCHAR(5) NOT NULL,
    withReps BOOLEAN NOT NULL
);

INSERT INTO exercise_metadata (sid, name, item, withReps)
VALUES ('PUSH-UPS', 'push-ups', 'kg', true),
('PULL-UPS', 'pull-ups', 'kg', true),
('BARS', 'bars', 'kg', true),
('BICEPS', 'biceps', 'kg', true),
('TRICEPS', 'triceps', 'kg', true),
('ABS', 'abs', 'aj', false),
('SHOULDERS', 'shoulders', 'kg', true),
('OVERHEAD_PRESS', 'overhead press', 'kg', true),
('SQUATS', 'squats', 'kg', true),
('SWIM', 'swim', 'km', false),
('RUN', 'run', 'km', false),
('CYCLING', 'cycling', 'km', false),
('DEADLIFT', 'deadlift', 'km', true),
('PLANK', 'plank', 'min', false),
('CALVES', 'calves', 'kg', true),
('ZUMBA', 'zumba', 'h', false),
('BODY-PUMP', 'bodyPump', 'h', false),
('SCOOTER', 'scooter', 'km', false),
('BURPEE', 'burpee', 'n', false),
('SKATING', 'skating', 'km', false),
('SKIING', 'skiing(x-country)', 'km', false),
('SNOWBOARDING', 'snowbord', 'km', false),
('DANCING', 'dancing', 'h', false),
('YOGA', 'yoga', 'h', false),
('STRETCHING', 'stretching', '10min', false),
('TENNIS', 'tennis', 'h', false),
('SHAPE-UP', 'shape Up', 'h', false),
('KNEE-ROLL-OUT', 'knee roll-out', 'kg', true),
('ZEPN', 'zEPN', 'h', false),
('HYPEREXTENSION', 'hyperextension', 'kg', true),
('BENCH-PRESS', 'bench press', 'kg', true);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    weight SMALLINT,
    dob date
);

CREATE UNIQUE INDEX user_id_idx ON users (user_id);

CREATE TABLE days_off (
    user_id INT,
    day_off DATE NOT NULL,
    UNIQUE(user_id, day_off),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);
