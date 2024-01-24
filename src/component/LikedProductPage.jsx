import React, { Suspense, lazy, useEffect, useState } from "react";
import LikedProducts from "./LikedProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/LikedProductPage.css";
import "../assets/css/DislikeProduct.css";
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <FontAwesomeIcon className="icon-spinner" icon={faSpinner} spin />
  </div>
);

const LazyLikedProduct = lazy(() => import("./LikedProduct"));

const LikedProductsPage = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState(null);
  
  useEffect(() => {
    const storedLikedProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikedProducts);

    return () => {
      if (alertTimeoutId) {
        clearTimeout(alertTimeoutId);
      }
    };
  }, [alertTimeoutId]);

  const showAlertMessage = (title, message) => {
    setShowAlert({ title, message });

    if (alertTimeoutId) {
      clearTimeout(alertTimeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setShowAlert(false);
      setAlertTimeoutId(null);
    }, 3000);

    setAlertTimeoutId(newTimeoutId);
  };

  const handleDislikeInLikedPage = (product) => {
    const updatedLikedProducts = likedProducts.filter(
      (likedProduct) => likedProduct.id !== product.id
    );
    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));

    //here we can call the showAlertMessage Function here
    showAlertMessage("Product Disliked", `You have disliked ${product.name}`);
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyLikedProduct
          likedProducts={likedProducts}
          onDislike={handleDislikeInLikedPage}
          showAlertMessage={showAlertMessage}
        />
      </Suspense>

      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <div className="alert-header">
              <h3>{showAlert.title}</h3>
              <button className="close-btn" onClick={() => setShowAlert(false)}>
                &times;
              </button>
            </div>
            <div className="alert-body">
              <p>{showAlert.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedProductsPage;
