import axios from 'axios'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'



const Register = () => {
  
const navigate=useNavigate()
  
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    phone:""
  })
  const submitHandler=(event)=>{
    
    
    event.preventDefault()
    
    
    axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/register`,data,{withCredentials:true})
    
    
    .then(res=>{
     
      console.log(res.data);
      
      navigate("/login")
      
    })
    .catch(err=>{
      
      console.log(err.response);
      
      
    })
  }
  const changeHandler=(event)=>{
    const tempData={...data}
    tempData[event.target.name]=event.target.value
    setData(tempData)
    
    
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input type="text" name="name" className="input"  onChange={changeHandler} value={data.name} />
  
</fieldset>
        <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" name="email" className="input"  onChange={changeHandler} value={data.email} />
  
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">password</legend>
  <input type="password" name="password" className="input"  onChange={changeHandler} value={data.password} />
  
</fieldset>

        <fieldset className="fieldset">
  <legend className="fieldset-legend">phone</legend>
  <input type="text" name="phone" className="input"  onChange={changeHandler} value={data.phone} />
  
</fieldset>
<button className="btn btn-success" type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register