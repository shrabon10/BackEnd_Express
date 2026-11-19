import express, { type Application, type Request, type Response } from "express"
const app : Application = express()
const port = 5000
import { Pool, Result } from "pg";
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_Qb9JBpN7HWPj@ep-twilight-dream-b3ycjmku.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require" 
})
// console.log(pool);



const initDB = async() =>{

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

initDB()








app.get('/', (req : Request, res: Response) => {
//   res.send('Hello World!')

    console.log(req);
    res.status(200).json({
        success: true,
        message: "this is root rout",
        author: "Shrabon"
    })

})


app.post('/api/v1/users', async(req : Request, res: Response)=>{
    // console.log(req.body);
   try {

     const {name, email, passward, age} = req.body
    
    const result = await pool.query(`
        INSERT INTO users (name, email, passward, age) VALUES
        ($1, $2, $3, $4) RETURNING *
        `,[name, email, passward , age])

    console.log(result);
    res.status(201).json({
        success: true,
        message: "Users Created!!!",
        data: result.rows[0]
    })
    
   } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error?.message,
        error: error
    })
   }
})

//getAPI
app.get('/api/v1/users', async(req : Request, res: Response)=>{
    try {
        const result = await pool.query(`
            SELECT * FROM users
            `)
            // console.log(result);

        
    } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error?.message,
        error: error
    })
    }
})

//single get api
app.get('/api/v1/users/:id', async(req : Request, res: Response)=>{
    try {
        const {id} = req.params
        const result = await pool.query(`
                SELECT * FROM users
                WHERE id=$1
            `, [id],)
            // console.log(result);
        res.status(201).json({
        success: true,
        message: "Users Created!!!",
        data: result.rows[0]
    })
        
    } catch (error: any) {
    res.status(500).json({
        success: false,
        message: error?.message,
        error: error
    })
    }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})