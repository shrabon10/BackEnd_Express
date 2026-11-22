import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connection_string
})
// console.log(pool);

export const initDB = async() =>{

    try {
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            passward VARCHAR(255) NOT NULL,
            age INT,
            is_Active BOOLEAN DEFAULT True,

            create_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
            `
        )
        console.log("Database are Connected!!!");
        // initDB()
        
    } catch (error) {
        console.log(error);
    }

}