import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{

  console.log(req.cookies)
  const token = req.cookies.token

  if(!token){
    return res.status(401).json("Unauthorized")
  }

  const decoded = jwt.verify(token,"projectkey")
  // console.log(decoded)

  req.userId = decoded.id

  next()

}