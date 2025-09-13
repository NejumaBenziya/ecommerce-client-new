import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateLoginStatus, setUserRole, setCartLength } from '../globalState/login/loginSlice'

import { Link } from 'react-router-dom'

const Login = () => {
  

  const dispatch=useDispatch()
const navigate=useNavigate()
  const [error,setError]=useState("")
  const [data,setData]=useState({
    email:"",
    password:""
  })
  const submitHandler = (event) => {
  event.preventDefault();

  axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/user/login`, data, { withCredentials: true })
   .then(res => {
  localStorage.setItem("token", res.data.token);

  dispatch(updateLoginStatus(true));
  dispatch(setUserRole(res.data.user.role));
  dispatch(setCartLength(res.data.user.cartLength || 0));

  if (res.data.user.role === "admin") {
    navigate("/admin/homepage");
  } else if (res.data.user.role === "seller") {
    navigate("/seller/homepage");
  } else {
    navigate("/");
  }
})

    .catch(err => {
      setError(err.response?.data?.message || "Something went wrong");
    });
};

  const changeHandler=(event)=>{
    const tempData={...data}
    tempData[event.target.name]=event.target.value
    setData(tempData)
    
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Type your email"
              onChange={changeHandler}
              value={data.email}
              required
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Type your password"
              onChange={changeHandler}
              value={data.password}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </fieldset>

          {/* Submit Button */}
          <button className="btn btn-success w-full" type="submit">
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-4">
          Not registered yet?{" "}
          <Link to="/register" className="text-accent font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login