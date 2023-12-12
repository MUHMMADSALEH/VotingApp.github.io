import jwt from 'jsonwebtoken'

export const getToken =(user) =>{
  const assesToken=jwt.sign({id:user.id,username:user.username},"jsonwebtokenljfaldfakjl")
  return assesToken;
}

export const verifyToken =(req,res,next)=>{
     const access_token = req.cookies.access_token;
     if(!access_token) return res.status(400).json("User is not authenticated!")
     try{
         const validToken=jwt.verify(access_token,"jsonwebtokenljfaldfakjl")

         if(validToken){
            req.authenticated = true
            next()
         }else{
            return res.json("Token in not valid!")
         }
     }catch(err){
        return res.status(400).json(err)
     }
     
}