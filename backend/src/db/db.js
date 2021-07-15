const { Pool, Client } = require('pg');
const config = require('../../db_config');
const assert = require('assert');

const pool = new Pool(config.db);

checkMandatoryFieldValue = (errorPrefix, fieldName, value) => {
    assert(value !== undefined, `${errorPrefix} '${fieldName}' is undefined!`);
}

module.exports = {
    getExerciseMetadata: async () => {
        const { rows } = await pool.query('SELECT * FROM exercise_metadata');
        return rows;
    },
    createUser: async(username, password, email, weight, dob) => {
        const errorPrefix = 'Create new user:';
        checkMandatoryFieldValue(errorPrefix, 'username', username);
        checkMandatoryFieldValue(errorPrefix, 'password', password);
        checkMandatoryFieldValue(errorPrefix, 'email', email);

        weight = (weight === undefined ? null: weight);
        dob = (dob === undefined ? null: dob);

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            var query = {
                text: 'INSERT INTO users(user_name, password, email, weight, dob) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                values: [username, password, email, weight, dob]
            };
            const { rows } = await client.query(query);
            await client.query('COMMIT');
            return rows[0].user_id;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },
    getUserByUsername: async(username) => {
        const query = {
            text: 'SELECT * FROM users WHERE user_name = $1',
            values: [username]
        };
        const { rows } = await pool.query(query);
        return (rows.length > 0 ? rows[0]: undefined);
    },
    findDaysOff: async(userId, dateFrom, dateTo) => {
        const query = {
            text: 'SELECT * FROM days_off WHERE user_id = $1 and day_off BETWEEN $2 AND $3',
            values: [userId, dateFrom, dateTo]
        };
        const { rows } = await pool.query(query);
        return rows;
    },
    addDaysOff: async(userId, daysOff) => {
        const errorPrefix = 'Add new day-off:';
        checkMandatoryFieldValue(errorPrefix, 'userId', userId);

        var values = '';
        daysOff.forEach( dayOff => values = values + `( ${userId}, '${dayOff}' ),`);
        values = values.substring(0, values.length - 1);

        const query = `INSERT INTO days_off(user_id, day_off) VALUES ${values}`;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const { rows } = await client.query(query);
            await client.query('COMMIT');
            return;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

};