import express from "express"
import cors from"cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRouter.js"
import { dbConnection } from "./dbConnection/db.js"


const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.end("hello")
})

app.use('/api/auth',authRouter)

dbConnection()



app.listen(3500,()=>{
    console.log("server started at http://localhost:3500")
})