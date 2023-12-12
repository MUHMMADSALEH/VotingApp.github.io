import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './adminpage.module.css'
import axios from 'axios'
import { makeRequest } from '../../axios'
const Adminpage = () => {
  const navigate=useNavigate()
  const [data,setData]=useState([]);
 
  useEffect(()=>{
     const fetchCandidates=async()=>{
      try{
        const res=await makeRequest.get('/vote/getallcandidatesvotes')
        setData(res.data);

      }catch(err){
        console.log(err);
      }

     }
     fetchCandidates();
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={()=>navigate('/addcandidate')}>Add Candidate</button>
        <button className={styles.btn} onClick={()=>navigate('/removecandidate')}>Remove Candidate</button>
        <button className={styles.btn} onClick={()=>navigate('/')}>Logout</button>
      </div>
      <h1>All the candidates</h1>
     <div className={styles.candidates}>
      { 
         data && data.map((candidate,i)=>{
            return  <div className={styles.singleCandidate} key={i}>
          <span>{candidate.name}</span>
          <span>{candidate.count}</span>
        </div>
         })

      }
       
       
     </div>
    </div>
  )
}

export default Adminpage
