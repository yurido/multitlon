-- for new Postgresql DB. Need to run with superuser!
CREATE ROLE multitlon WITH LOGIN PASSWORD 'multitlon';
ALTER ROLE multitlon CREATEDB;

-- run with 'multitlon' user
psql -d postgres -U multitlon

-- create new DB 'multitlon'
CREATE DATABASE multitlon;

-- create table exercise_metadata
CREATE TABLE exercise_metadata (
    sid VARCHAR(40) PRIMARY KEY,
    name VARCHAR(40),
    item VARCHAR(5),
    withReps BOOLEAN
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
