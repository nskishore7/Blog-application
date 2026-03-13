import express from "express"
import { verifyToken } from "../middlewares/authmiddleware.js"
import { allBlog, blogCreate, delBlog, updateBlog } from "../controllers/blogController.js"


const blogRouter = express.Router()

// Create blog
blogRouter.post("/create",verifyToken,blogCreate)

// Get all blogs
blogRouter.get("/all",allBlog)


//Get update blog
blogRouter.put("/:id",verifyToken,updateBlog)

// Delete blog
blogRouter.delete("/:id",verifyToken,delBlog)

export default blogRouter