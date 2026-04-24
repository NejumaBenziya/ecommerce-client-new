import api from "../api/axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuthUser, setWishlist } from "../globalState/login/loginSlice";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // store error message
  const [error, setError] = useState("");

  // store form data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // handle login submit
  const submitHandler = (event) => {
    event.preventDefault(); // prevent page reload

    api
      .post(
        "/api/user/login",
        data,
        { withCredentials: true } // send cookies
      )
      .then((res) => {

        // store user data in redux
        dispatch(
          setAuthUser({
            user: res.data.user,
            role: res.data.user.role,
            
          })
        );

        // store wishlist in redux
        dispatch(
          setWishlist({
            wishlist: res.data.user.wishlist
          })
        );

        const role = res.data.user.role;

        // redirect based on role
        if (role === "seller") {
          navigate("/seller/homepage");
        } else if (role === "admin") {
          navigate("/admin/homepage");
        } else {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        // show backend error
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  // update input fields
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
          {/* Email input */}
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

          {/* Password input */}
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

            {/* show error message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </fieldset>

          {/* submit button */}
          <button className="btn btn-success w-full" type="submit">
            Login
          </button>
        </form>

        {/* register link */}
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