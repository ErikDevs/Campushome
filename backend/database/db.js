import { config } from "dotenv";
import mysql from "mysql2/promise"; // Note the /promise import

config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD; // Fixed variable name
const database = process.env.DB_NAME;

// Create a connection pool instead of single connection
export const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
});

// Test the connection on startup
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if we can't connect to database
  } finally {
    if (connection) connection.release();
  }
}

// Run the connection test
testConnection();
