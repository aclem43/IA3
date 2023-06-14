import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const sql = mssql;
const connect = async () => {
  try {
    if (process.env.DB_STRING) {
      await sql.connect(process.env.DB_STRING);
    }
  } catch (err) {
    console.log(err);
  }
};

const initDB = () => {
  connect();
};

export { initDB as initialzeDatabase };
