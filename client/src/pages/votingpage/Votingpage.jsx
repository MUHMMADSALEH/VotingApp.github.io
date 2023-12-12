import { useEffect, useState } from 'react'
import styles from './votingpage.module.css'
import { useSelector} from "react-redux"
import { makeRequest } from '../../axios'
import {useNavigate} from 'react-router-dom'
const Votingpage = () => {
  const navigate=useNavigate()
  const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [success,setSuccess]=useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [candidates,setCandidates]=useState([])
  const {username}=useSelector(state=>state.user)
  const [selectedOption,setSelectedOption] = useState("");
    const handchange=(e)=>{
      setSelectedOption(e.target.value);
       
    }
    const handleVote=async(e)=>{
      e.preventDefault();
      if(selectedOption==""){
        setError(true);
        setErrorMessage("Please select a candidate");
        setTimeout(()=>{setError(false)},2000)
      }
      try{

        const res=await makeRequest.post('/vote/addvote',{candidate:selectedOption,voter:username});
        if(res.data.status){
          setSuccess(true);
          setSuccessMessage(res.data.message)
          setTimeout(()=>{
            setError(false)
            navigate('/')
          },2000)
        }
      }catch(err){
        setError(true);
        setErrorMessage(err.response.data.message)
        setTimeout(()=>{setError(false)},2000)
      }

    }
    useEffect(()=>{
       const fetchCandidates=async()=>{
         try{
            const res=await makeRequest.get('/vote/getcandidates')
            setCandidates(res.data);
         }catch(err){
          console.log(err.message);
         }
       }
       fetchCandidates()
    },[])
  return (
    <div className={styles.container}>
      {success && <h2 className={styles.successMessage}>{successMessage}</h2>}
      {error && <h2 className={styles.errorMessage}>{errorMessage}</h2>}
      <form className={styles.form} >
       {
          candidates && candidates.map((candidate,i)=>{
              return <div className={styles.option} key={i}>
        <input type="radio" name='voting' id={candidate.name} onChange={handchange} value={candidate.name} />
        <label htmlFor={candidate.name} className={styles.label}>{candidate.name}</label>
        </div>
          })
       
       
        }
       <button className={styles.btn} onClick={handleVote}>Vote</button>
      </form>
    </div>
  )
}

export default Votingpage
