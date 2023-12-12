import { db } from "../connection.js";

// Get All The Candidates Name Who Are Participating In The Election.
export const getCandidates = (req, res) => {
  try {
    const q = "SELECT * FROM Candidates";
    db.query(q, (err, data) => {
      if (err)
        return res.status(500).json({ status: false, message: "Something went wrong" });
      return res.status(200).json(data);
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};

// Add A Candidate.
export const addCandidate = (req, res) => {
  const { candidate } = req.body;
  console.log(candidate);
  try {
    const q = "SELECT name FROM Candidates where name=?";
    db.query(q,[candidate] ,(err, data) => {
      if (err)
        return res.status(500).json({ status: false, message: "Something went wrong" });
    if(data.length==0){
        const q1="INSERT INTO Candidates(`name`) VALUES (?)"; 
        db.query(q1,[candidate] ,(err, data) => {
            if(err) return res.status(500).json({ status: false, message:"Something went wrong"});
            return res.status(200).json({status: true, message:"Candidate added successfully"})
        })
    }else{
        return res.status(401).json({status:false,message:"Candidate already exists"});

    }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
};
// Remove A Candidate.
export const removeCandidate = (req, res) => {
  const {name}=req.params;
  console.log(name)
 try{
    const q1="SELECT name FROM Candidates WHERE name=?";
    db.query(q1,[name],(err,data) => {
      if(err)return res.status(500).json({status: false, message:err.message});
    
      if(data.length!=0){
        const q="DELETE FROM Candidates WHERE name=?";
        db.query(q,[name],(err,data) => {
         if(err) return res.status(500).json({status: false, message:err.message});
         return res.status(200).json({status:true,message:"Candidate removed successfully"});
        })
      }else{
        return res.status(401).json({status: false, message:"Candidate does not exist"})
      }
    })
 }catch(err){
   return res.status(500).json({status: false, message: err.message})
 }
}
// Add A Vote To A Candidate.
export const addVote = (req, res) => {
  const { candidate, voter } = req.body;
  console.log(candidate,voter)
  try {
     const q1="SELECT voter FROM Vote WHERE voter=?";
     db.query(q1,[voter],(err,data) => {
       if(err) return res.status(500).json({ status: false, message: "Something went wrong" });
        if(data.length==0){
            const q = "INSERT INTO Vote(`name`,`voter`) VALUES(?)";
            const value = [candidate, voter];
            db.query(q, [value], (err) => {
              if (err)
                return res.status(500).json({ status: false, message:"Something went wrong" });
              return res
                .status(200)
                .json({ status: true, message: "voted successfully, You are about to log out" });
            });
        }else{
            return res.status(401).json({status:false,message:"This Voter has already voted"})
        }
     })
  } catch (err) {
    return res.status(500).json({ status: false, message: "Something went wrong" });
  }
};

// Get All The Votes That Every Candidate Has Got Along With Candidate Name.

export const getAllVotesOFEveryCandidate=(req,res)=>{
   try{
        const q="SELECT C.name,count(V.name) AS count FROM Candidates AS C LEFT JOIN Vote AS V ON C.name=V.name GROUP BY C.name;" ;
        db.query(q,(err,data)=>{
          if(err) return res.status(500).json({status:false,message:"something went wrong"})
          return res.status(200).json(data);
        }) 
   }catch(err){
     return res.status(500).json({status:false,message:err.message});
   }
}

