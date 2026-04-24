import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import api from "../api/axios";
import ProductDetails from '../components/ProductDetails';

function Productpage() {

  //  State to store single product
  
  const [product, setProduct] = useState({});

  //  get current URL location
  const location = useLocation();

  //  extract query params
  const params = new URLSearchParams(location.search);

  //  get productId from URL
  const productId = params.get("productId");

  //  debug log
  console.log(productId);

  //  fetch product when productId changes
  useEffect(() => {
    if (productId) {

      //  API call to get product details
      api.get("/api/user/product", {
        params: { productId },
        withCredentials: true, // optional (for cookies if needed)
      })
        .then((res) => {

          //  set product data from response
          setProduct(res.data.product);

        })
        .catch(err => console.log(err)); 

    }
  }, [productId]);

  //  loading fallback (won't work properly due to [] initial state)
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {/*  pass product to child component */}
      <ProductDetails product={product} key={product._id}/>
    </div>
  )
}

export default Productpage;