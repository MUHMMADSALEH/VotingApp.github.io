import {db} from '../connection.js'
import {getToken} from '../jwt.js'
export const register=(req,res)=>{
   const {username,password,email,phone,isAdmin}=req.body;
   console.log(req.body ,"hello")
   try{
      
         const q="INSERT INTO USER(`username`, `password`,`email`,`phone`,`isAdmin`) VALUES(?)";
         const value=[username,password,email,phone,isAdmin];
         db.query(q,[value],(err,data)=>{
             if(err) return res.status(500).json({status:false,message:"Something went wrong"})
             res.status(200).json({status:true,data:data})
         })
     
   }catch(err){
    res.status(500).json({status:false,message:"Something went wrong"})
   }
 
}
export const signin=(req,res) => {
    const {username,password} = req.body;
    console.log(req.body)
    try{
      
        const q="SELECT * FROM USER WHERE username=?";
        const value=[username];
        db.query(q,[value],(err,data)=>{
            if(err) return false;
    
            if(data.length > 0) {
              if(data[0].password!=password){
                return res.status(401).json({status:false, message:"invalid password"})
              }else{
                const token=getToken(data[0])
                return res.cookie("access_token",token,{httpOnly:true}).json({status:true, data})
               }
            }else{
                res.status(401).json({status:false,message:"User does not exist"})
            }
        })
    
  }catch(err){
    res.status(500).json({message:"Something went wrong",err:err.message})
  }
}
