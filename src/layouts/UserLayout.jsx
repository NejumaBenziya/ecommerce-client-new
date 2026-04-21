import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { checkAuth } from "../api/authApi";
import { setAuthUser, logout, authFinished, setWishlist } from "../globalState/login/loginSlice";


const UserLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth()
      .then((res) => {
        dispatch(
          setAuthUser({
            user: res.data.user,
            role: res.data.user.role,

            cartLength: res.data.cartLength,

          })
        );
        dispatch(
          setWishlist({
            wishlist: res.data.user.wishlist

          })
        );
      })
      .catch(() => {
        dispatch(authFinished()); // just mark auth check done
      })

  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
