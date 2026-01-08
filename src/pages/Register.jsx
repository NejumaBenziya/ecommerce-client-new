import api from "../api/axios";
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
    
    
   api.post("/api/user/register", data)
    
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
  <form
    onSubmit={submitHandler}
    className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-700">
      Register
    </h2>

    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold text-gray-600">
        Name
      </legend>
      <input
        type="text"
        name="name"
        className="input input-bordered w-full"
        onChange={changeHandler}
        value={data.name}
        placeholder="Enter your name"
      />
    </fieldset>

    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold text-gray-600">
        Email
      </legend>
      <input
        type="email"
        name="email"
        className="input input-bordered w-full"
        onChange={changeHandler}
        value={data.email}
        placeholder="Enter your email"
      />
    </fieldset>

    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold text-gray-600">
        Password
      </legend>
      <input
        type="password"
        name="password"
        className="input input-bordered w-full"
        onChange={changeHandler}
        value={data.password}
        placeholder="Enter your password"
      />
    </fieldset>

    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold text-gray-600">
        Phone
      </legend>
      <input
        type="text"
        name="phone"
        className="input input-bordered w-full"
        onChange={changeHandler}
        value={data.phone}
        placeholder="Enter your phone number"
      />
    </fieldset>

    <button
      className="btn btn-success w-full rounded-lg text-white text-lg"
      type="submit"
    >
      Register
    </button>
  </form>
</div>

  )
}

export default Register