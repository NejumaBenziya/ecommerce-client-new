import api from "../api/axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout, setAuthUser } from "../globalState/login/loginSlice";
import { useEffect } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
  //dispatch(logout()); // 🔥 clear old user state
}, []);
  const submitHandler = (event) => {
    event.preventDefault();

    api
      .post(
        "/api/user/login",   // ✅ USE PROXY
        data,
        { withCredentials: true }
      )
      .then((res) => {
        //dispatch(logout());
        dispatch(
          setAuthUser({
            user: res.data.user,
            role: res.data.user.role,
          }))
          navigate("/");
        
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

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

          <button className="btn btn-success w-full" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Not registered yet?{" "}
          <Link to="/register" className="text-accent font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
