import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import api from "../api/axios";
import { useLocation } from 'react-router-dom';

const UserListpage = () => {

  //  state to store users
  const [users, setUsers] = useState([]);

  //  access current URL
  const location = useLocation();

  // extract query params
  const params = new URLSearchParams(location.search);

  // get role filter from URL (?role=...)
  const role = params.get("role");

 
  useEffect(() => {

    //  API call to fetch users
    api.get(
      "/api/admin/user-list",
      {
        params: { role }, // send role filter
        withCredentials: true, // cookie-based authentication
      }
    )
      .then(res => {

        //  store users in state
        setUsers(res.data.users);

        

      })
      .catch(err => {

        // error logging 
        console.log(err.response);

      });

  }, [role, users]); 
  return (
    <>
      <div className="container mx-auto px-4">

        {/* page title */}
        <h1 className="text-2xl font-bold text-center mb-6">User List</h1>

        {/*  grid layout for user cards */}
        <div
          className="
            grid 
            gap-6 
            justify-center
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            items-stretch
          "
        >

          {/*  render each user */}
          {users.map((item) => (
            <div key={item._id} className="flex">

              {/*  individual user card */}
              <UserCard user={item} className="flex-1 h-full" />

            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default UserListpage