import express from "express"
import cors from"cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRouter.js"
import { dbConnection } from "./dbConnection/db.js"
import blogRouter from "./routes/blogRoutes.js"


const app=express()
app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.end("hello")
})

app.use('/api/auth',authRouter)
app.use('/api/blog',blogRouter)

dbConnection()



app.listen(3500,()=>{
    console.log("server started at http://localhost:3500")
})