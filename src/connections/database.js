const Postgres = require('pg');
const MySQL = require('mysql2');
const cron = require('node-cron');
require('dotenv').config({ path: `${__dirname}/../.env` });

class PostgresDatabase {
    constructor() {
        this.Pool = new Postgres.Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_NAME,
            password: process.env.PG_PASS,
            port: Number(process.env.PG_PORT),
        });

        cron.schedule('*/5 * * * *', () => {
            // replace the pool
            this.Pool = new Postgres.Pool({
                user: process.env.PG_USER,
                host: process.env.PG_HOST,
                database: process.env.PG_NAME,
                password: process.env.PG_PASS,
                port: process.env.PG_PORT,
            });
        })
    }
    query = async (query, data = []) => await this.Pool.query(query, data);
    end = async () => await this.Pool.end();
}

class MySQLDatabase {
    constructor() {
        this.Pool = MySQL.createPool({
            user: process.env.MSQL_USER,
            host: process.env.MSQL_HOST,
            database: process.env.MSQL_NAME,
            password: process.env.MSQL_PASS,
            port: Number(process.env.MSQL_PORT),
            ssl: { rejectUnauthorized: true }
        });

        cron.schedule('*/30 * * * *', () => {
            this.Pool = MySQL.createPool({
                user: process.env.MSQL_USER,
                host: process.env.MSQL_HOST,
                database: process.env.MSQL_NAME,
                password: process.env.MSQL_PASS,
                port: Number(process.env.MSQL_PORT),
                ssl: { rejectUnauthorized: true }
            });
        })
    }
    query = async (query, data = []) => {
        const connection = await this.Pool.promise().getConnection();
        const [rows, fields] = await connection.query(query, data);
        connection.release();
        return { rows, fields };
    }
    end = () => this.Pool.end();
}

class Database {
    constructor() {
        this.Postgres = new PostgresDatabase();
        this.MySQL = new MySQLDatabase();
    }
}

module.exports = Database;