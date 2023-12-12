
import { useState } from 'react'
import styles from './register.module.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  const [error, setError] =useState(false)
  const [errorMessage, setErrorMessage] =useState("")
  const navigate=useNavigate()
  const [data,setData]=useState({username:"",password:"",email:"",phone:"",isAdmin:false})
  const handleclick = () =>{
    navigate('/')
  }
  // console.log(data)
  const handleRegister=async(e)=>{
    e.preventDefault();
    if(data.username=="" || data.password=="" || data.email=="" || data.phone==""){
       setError(true);
       setErrorMessage("Please enter all required fields");
       setTimeout(() => {
        setError(false);
       }, 2000);
       return;
    }
    const res=await axios.post('http://localhost:8800/api/auth/register',data)
   
    if(res.data.status){
      navigate('/')
    }
  }
  return (
    <div className={styles.container}>
     <h1>Register page</h1>
     {error && <h5 className={styles.errorMessage}>{errorMessage}</h5>}
    <div className={styles.subContainer}>
     <input type="text" placeholder='USERNAME...'  className={styles.input}
     onChange={(e)=>setData({...data,username:e.target.value})}
     />
     <input type="password" placeholder='PASSWORD' className={styles.input}
      onChange={(e)=>setData({...data,password:e.target.value})}
      />
     <input type="email" placeholder='EMAIL ID' className={styles.input}
      onChange={(e)=>setData({...data,email:e.target.value})}
      />
     <input type="password" placeholder='PHONE NO.' className={styles.input}
      onChange={(e)=>setData({...data,phone:e.target.value})}
      />
     <div className={styles.buttons}>
     <button className={styles.btn} onClick={handleRegister}>Register</button>
     <button className={styles.btn} onClick={handleclick}>Login</button>
     </div>
    </div>
    </div>
  )
}

export default Register
