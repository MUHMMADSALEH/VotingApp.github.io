import { useState } from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { addUser } from '../../redux/userSlice';
import { useDispatch } from "react-redux"
import { makeRequest } from '../../axios';
const Login = () => {
  const Dispatch=useDispatch()
  const [data,setData]=useState({username:"",password:""})
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const navigate=useNavigate()
  const handleclick=() => {
     navigate('/register')
  }
  // console.log(data)
  const handleLogin=async(e)=>{
    e.preventDefault();
    if(data.username=="" && data.password==""){
       setError(true);
       setErrorMessage("Please enter username and password")
       setTimeout(()=>{setError(false)},2000)
       return;
    }
    if(data.username===""){
       setError(true);
       setErrorMessage("Please enter the username")
       setTimeout(()=>{setError(false)},2000)
       return;
    }
    if(data.password===""){
      setError(true);
       setErrorMessage("Please enter the password")
       setTimeout(()=>{setError(false)},2000)
       return;
    }
   
    try{

      const res=await makeRequest.post('/auth/login',data)
      console.log("data",res.data.data)
      if(res.data.status){
        Dispatch(addUser(res.data.data[0]))
        if(res.data.data[0].isAdmin){
          navigate('/adminpage')
        }else{
          navigate('/votingpage')

        }
      }
    }catch(err){
      setError(true);
      setErrorMessage(err.response.data.message)
      setTimeout(()=>{setError(false)},2000)
      return;
    }
  }
  return (
    <div className={styles.container}>
      <h1>Login page</h1>
     { error &&  <h4 className={styles.errorMessage}>{errorMessage}</h4>}
    <div className={styles.subContainer}>
     <input type="text" placeholder='USERNAME'  className={styles.input}
     onChange={(e)=>setData({...data,username:e.target.value})}
     />
     <input type="password" placeholder='PASSWORD' className={styles.input} 
      onChange={(e)=>setData({...data,password:e.target.value})}
     />
     <div className={styles.buttons}>

     <button className={styles.btn} onClick={handleLogin}>Login</button>
     <button className={styles.btn} onClick={handleclick}>Register</button>
     </div>
    </div>
    </div>
  )
}

export default Login
