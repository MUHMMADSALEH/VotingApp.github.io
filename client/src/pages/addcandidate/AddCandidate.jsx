import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './add.module.css'
import axios from 'axios';
import { makeRequest } from '../../axios';
const AddCandidate = () => {
    const navigate=useNavigate()
    const [data,setData] = useState("");
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const [success,setSuccess]=useState(false);
    const [successMessage,setSuccessMessage]=useState("");
    console.log(data)
    const handleclick=async(e)=>{
        e.preventDefault();
       
        if(data===""){
            setError(true);
            setErrorMessage("Please enter candidate name");
            setTimeout(()=>{setError(false)},2000);
            return;
        }
       try{
           const res= await makeRequest.post('/vote/addcandidate',{candidate:data});
           if(res.data.status){
            setSuccess(true);
            setSuccessMessage(res.data?.message);
            setData("")
            setTimeout(()=>{setSuccess(false)},3000);
           }
        console.log(res)
       }catch(err){
          setError(true)
          setErrorMessage(err.response.data.message);
          setTimeout(()=>{setError(false),2000});
       }
    }
  return (
    <div className={styles.container}>
       {success &&  <h3 className={styles.successMessage}>{successMessage}</h3>}
       {error && <h3 className={styles.errorMessage}>{errorMessage}</h3>}
      <div className={styles.subContainer}>
        <button className={styles.btn} onClick={()=>navigate('/adminpage')}>Go go to admin page</button>
        <div className={styles.addContainer}>
         <input type="text" placeholder='Enter Candidate Name' className={styles.input}
         onChange={(e)=>setData(e.target.value)}
         value={data}
          />
         <button className={styles.btn} onClick={handleclick}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddCandidate
