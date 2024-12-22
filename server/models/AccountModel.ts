import pg, { QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const { Pool } = pg;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: null,
});

const db = {
  startDB: async () => {
    try {
      await pool.connect();
      const createAccountsTableQuery = `
        CREATE TABLE IF NOT EXISTS accounts (
          id SERIAL,
          username VARCHAR(255) PRIMARY KEY,
          password VARCHAR(255)
        )
      `;
      const createFormsTableQuery = `
        CREATE TABLE IF NOT EXISTS forms (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255),
          wizardpage2 TEXT[] DEFAULT '{"wizardAboutMe", "wizardItemCategory"}',
          wizardpage3 TEXT[] DEFAULT '{"wizardBirthday"}',
          aboutMe TEXT,
          address VARCHAR(255),
          city VARCHAR(100),
          state VARCHAR(100),
          zip INT,
          birthday VARCHAR(100),
          item_category VARCHAR(100),
          FOREIGN KEY (username) REFERENCES accounts(username)
        )
      `;
      await pool.query(createAccountsTableQuery);
      await pool.query(createFormsTableQuery);
    } catch (err) {
      console.log(err);
    }
    return;
  },
  query: (text: string, params: any[]): Promise<QueryResult<any>> => {
    console.log('executed query', text);
    return pool.query(text, params);
  }
}

export default db;