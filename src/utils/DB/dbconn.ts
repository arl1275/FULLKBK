import * as dotenv from 'dotenv'
import { Pool } from 'pg';
dotenv.config()

const connDB = new Pool({
  user : process.env.DEVSERVER_USER,
  host : process.env.DEVSERVER_IP,
  database : process.env.DEVSERVER_DB,
  password : process.env.DEVSERVER_PASS,
  port : 1500, // Default PostgreSQL port
});

connDB.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0]);
  }
});

export default connDB;