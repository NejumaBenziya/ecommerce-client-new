import api from "../api/axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuthUser, setWishlist } from "../globalState/login/loginSlice";
import GoogleLogin from "../components/GoogleLogin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  Stores backend validation errors (invalid credentials, etc.)
  const [error, setError] = useState("");

  //  Controlled form state for login inputs
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //  Handles email/password login flow
  const submitHandler = (event) => {
    event.preventDefault(); // Prevent full page reload

    //  Send login request to backend (JWT cookie-based auth)
    api
      .post("/api/user/login", data, { withCredentials: true })
      .then((res) => {

        //  Store authenticated user in global Redux state
        dispatch(
          setAuthUser({
            user: res.data.user,
            role: res.data.user.role,
          })
        );

        //  Sync wishlist globally for instant UI updates
        dispatch(
          setWishlist({
            wishlist: res.data.user.wishlist
          })
        );

        const role = res.data.user.role;

        //  Role-based navigation (real-world access control)
        if (role === "seller") {
          navigate("/seller/homepage");
        } else if (role === "admin") {
          navigate("/admin/homepage");
        } else {
          navigate("/"); //  Default user landing
        }
      })
      .catch((err) => {
        //  Capture backend error message for user feedback
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

  //  Updates form state dynamically on user input
  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">

        {/*  Page heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/*  Google OAuth login (faster onboarding option) */}
        <div className="flex justify-center mb-4">
          <GoogleLogin />
        </div>

        {/*  Visual separator between auth methods */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/*  Email/Password login form */}
        <form onSubmit={submitHandler} className="space-y-4">

          {/*  Email field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              onChange={changeHandler}
              value={data.email}
              required
            />
          </div>

          {/*  Password field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              onChange={changeHandler}
              value={data.password}
              required
            />

            {/*  Error feedback from backend */}
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          {/*  Submit button */}
          <button className="btn btn-success w-full mt-2" type="submit">
            Login
          </button>
        </form>

        {/*  Navigation to registration */}
        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;