import express, { type Application, type Request, type Response } from "express"
const app : Application = express()
import config from "./config";
import { pool } from "./db";
import { userRoute } from "./modules/users/user.route";
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use("/api/v1/users", userRoute)

export default app