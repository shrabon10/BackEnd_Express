import { pool } from "../../db";
import type { Iuser } from "./user.interface";
// import { Iuser } from './user.interface';

const createUserIntoDB = async(payload: Iuser )=>{

    const {name, email, passward, age} = payload;
    const result = await pool.query(`
        INSERT INTO users (name, email, passward, age) VALUES
        ($1, $2, $3, $4) RETURNING *
        `,[name, email, passward , age])
        return result
}

const getAllUsersFromDB = async() =>{
    const result = await pool.query(`
            SELECT * FROM users
            `)
    return result
}

const getSingleUserFromDB = async(id: string) =>{
            const result = await pool.query(`
                SELECT * FROM users
                WHERE id=$1
            `, [id],)

            return result
}


const UpdateUserFromDB = async(payload: any, id: string) =>{
    const { name, email, age, passward, is_active } = payload

        const result = await pool.query(
            `
            UPDATE users
            SET
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                passward = COALESCE($3, passward),
                age = COALESCE($4, age),
                is_active = COALESCE($5, is_active)
                WHERE id = $6
            RETURNING id, name, email, age, is_active
            `,
            [
                name ?? null,
                email ?? null,
                passward ?? null,
                age ?? null,
                is_active ?? null,
                id
            ]
        );
        return result
}

const DeletUsersFromDB = async(id: string)=>{
    const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );
        return result
}


export const userSercie ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    UpdateUserFromDB,
    DeletUsersFromDB
}