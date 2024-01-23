import React, { Suspense, lazy, useEffect, useState } from 'react';
import LikedProducts from './LikedProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/LikedProductPage.css'
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <FontAwesomeIcon className="icon-spinner" icon={faSpinner} spin />
  </div>
)

const LikedProductsPage = () => {
  const[likedProducts, setLikedProducts] = useState([])
  
 const LazyLikedProduct = lazy(()=>{
  return new Promise((resolve)=>
  setTimeout(()=>resolve(import('./LikedProduct')),2000)
  )
 }) 
  useEffect(()=>{
    const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    setLikedProducts(storedLikedProducts)
  },[])

  const handleDislikeInLikedPage = (product) => {
    const updatedLikedProducts = likedProducts.filter((likedProduct) => likedProduct.id !== product.id);
    setLikedProducts(updatedLikedProducts)
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner/>}>
      <LazyLikedProduct
      likedProducts={likedProducts} 
      onDislike={handleDislikeInLikedPage} />
      </Suspense>
    </div>
  );
};

export default LikedProductsPage;
