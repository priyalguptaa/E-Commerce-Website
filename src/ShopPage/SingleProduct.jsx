import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  // console.log(id)
  //when we load the data so we use useEffect beacsuse its run when componenet is oaded
  useEffect(() => {
    fetch("/src/products.json").then((res => res.json())).then(data=> setProduct(data));
  }, []);

  const result = product.filter((p) => p.id === id)  
  console.log(result)


  return <div>SingleProduct</div>;
};

export default SingleProduct;
