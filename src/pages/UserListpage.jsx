import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import api from "../api/axios";
import { useLocation } from 'react-router-dom';

const UserListpage = () => {
     const [users, setUsers] = useState([]);
      const location = useLocation();
       const params = new URLSearchParams(location.search);
      const role=params.get("role");
     
    useEffect(() => {
   api.get(
  "/api/admin/user-list",
  {
    params: { role },
    withCredentials: true, // ✅ cookie-based auth
  }
)
    .then(res=>{
        
         
         setUsers(res.data.users)
         console.log(res.data);
         
          
        })
        .catch(err=>{
          
          console.log(err.response);
          
          
        })
  }, [role,users]);
  
  return (
  <>
  <div className="container mx-auto px-4">
    <h1 className="text-2xl font-bold text-center mb-6">User List</h1>

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
      {users.map((item) => (
        <div key={item._id} className="flex">
          <UserCard user={item} className="flex-1 h-full" />
        </div>
      ))}
    </div>
  </div>
</>

  )
}

export default UserListpage