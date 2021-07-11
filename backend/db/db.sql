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
('SHOULDERS', 'shoulders', 'kg', true);
