import Blog from "../model/blog.js"

export const blogCreate = async(req,res)=>{

  const blog = new Blog({
    title:req.body.title,
    description:req.body.description,
    author:req.userId
  })

  await blog.save()

  res.json(blog)
}



export const allBlog = async(req,res)=>{

  const blogs = await Blog.find()

  res.json(blogs)

}

export const updateBlog = async(req,res)=>{

  const blog = await Blog.findById(req.params.id)

  if(blog.author.toString() !== req.userId){
    return res.status(403).json("Not allowed")
  }

  blog.title = req.body.title
  blog.description = req.body.description

  await blog.save()

  res.json(blog)

}

export const delBlog = async(req,res)=>{

  await Blog.findByIdAndDelete(req.params.id)

  res.json("Blog deleted")

}