import { useEffect, useRef } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser, setWishlist } from "../globalState/login/loginSlice";

function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnRef = useRef(null);



  const handleCallbackResponse = async (response) => {

    try {
      const res = await api.post("/api/user/google", {
        token: response.credential,
      });


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

      }

    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      if (!window.google || !btnRef.current) return;

      window.google.accounts.id.initialize({
        client_id:
          "753183570033-ta1ea23cj1v2stl6j3soi2mvtmk2ajn0.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
        width: 250,
      });
    };

    document.body.appendChild(script);
  }, []);

  return (<div
    ref={btnRef}
    style={{ display: "flex", justifyContent: "center" }}
  ></div>
  )
}

export default GoogleLogin;