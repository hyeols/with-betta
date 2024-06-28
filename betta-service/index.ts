import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

require('dotenv').config();

const app = express();
const port = 33800;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
})

app.use(cors());
app.use(express.json());

app.get('/', async(req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bt_products'
    )
    res.json(result);
  } catch (err) {
    console.log(err);
  }
})

app.listen(port, () => {
  console.log('start');
})