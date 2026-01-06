import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from '../components/ProductDetails';

function Productpage() {
    const [product, setProduct] = useState([]);
         
         const location = useLocation();
      const params = new URLSearchParams(location.search);
     const productId=params.get("productId");
   
console.log(productId)
 

  useEffect(() => {
    if (productId) {
         axios.get("/api/user/product", {
  params: { productId },
  withCredentials: true, // optional for public route
})
      
        .then(res => setProduct(res.data.product))
        .catch(err => console.log(err));
    }
  }, [productId]);
  if (!product) return <p>Loading...</p>;

    
  return (
    <div><ProductDetails product={product} key={product._id}/></div>
  )
}

export default Productpage