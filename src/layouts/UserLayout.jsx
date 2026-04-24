import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { checkAuth } from "../api/authApi";
import { setAuthUser, authFinished, setWishlist } from "../globalState/login/loginSlice";

const UserLayout = () => {
  const dispatch = useDispatch();

  //  Runs once when app loads (restore user session)
  useEffect(() => {

    //  Call backend to check if user is logged in
    checkAuth()
      .then((res) => {

        //  Save user data in Redux
        dispatch(
          setAuthUser({
            user: res.data.user,              // 👤 full user object
            role: res.data.user.role,         // 🏷 role
            cartLength: res.data.cartLength,  // 🛒 cart count
          })
        );

        //  Save wishlist separately
        dispatch(
          setWishlist({
            wishlist: res.data.user.wishlist
          })
        );
      })

      .catch((err) => {

        //  Log structured error (very useful for debugging)
        console.error({
          message: err.message,               // basic error message
          data: err.response?.data,           // backend error response
          status: err.response?.status,       // HTTP status (401, 500, etc.)
        });

        //  Mark auth check completed (prevents UI freeze)
        dispatch(authFinished());
      });

  }, [dispatch]);

  return (
    // Full page layout (header + content + footer)
    <div className="flex flex-col min-h-screen">

      {/*  Navbar */}
      <Header />

      {/*  Page content */}
      <main className="flex-1">
        {/* Dynamic route rendering */}
        <Outlet />
      </main>

      {/*  Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;