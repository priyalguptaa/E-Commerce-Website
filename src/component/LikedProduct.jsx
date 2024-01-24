// LikedProducts.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/LikedProduct.css";

const LikedProducts = ({ likedProducts, onDislike, showAlertMessage}) => {

  const productRows = likedProducts.reduce((resultArray, item, index) => {
    const rowIndex = Math.floor(index / 4);

    if (!resultArray[rowIndex]) {
      resultArray[rowIndex] = [];
    }

    resultArray[rowIndex].push(item);
    return resultArray;
  }, []);


  return (
    <div>
      <div className="liked-products-container">
        <h3 className="liked-product">Liked Products</h3>
        {likedProducts.length === 0 ? (
          <h3 className="no-liked-product">No Liked Product Yet..!!</h3>
        ) : (
          <div className="roww">
            {productRows.map((row, rowIndex) => (
              <div key={rowIndex} className="product-row">
                {row.map((product, i) => (
                  <div key={i} className="product-itemm">
                    <div className="product-thumbb">
                      <img src={product.img} alt={product.name} />
                    </div>
                    <div className="product-action-linkk">
                      <Link to={`/shop/${product.id}`}>
                        <i className="icofont-eye"></i>
                      </Link>

                      <span>Liked</span>

                      <button onClick={() => { onDislike(product); showAlertMessage("Product Disliked", `You have disliked ${product.name}`); }}>
                        <i className="icofont-thumbs-down"></i>
                      </button>

                    </div>
                    <div className="product-contentt">
                      <h5>
                        <Link to={`/shop/${product.id}`}>{product.name}</Link>
                      </h5>
                      <h6>${product.price}</h6>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default LikedProducts;
