import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ratting from "../component/Ratting";
import LikedProducts from "../component/LikedProduct";
import '../assets/css/ProductCard.css'
const ProductCard = ({ Products }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [showLikedProducts, setShowLikedProducts] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  // this handleLike function work to return liked or unliked product
  const handleLike = (product) => {
    // if product is liked
    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.id === product.id
    );

    if (!isLiked) {
      // if product is not liked at one time
      const updatedLikedProducts = [...likedProducts, product];
      setLikedProducts(updatedLikedProducts);

      // Store liked products in local storage
      localStorage.setItem(
        "likedProducts",
        JSON.stringify(updatedLikedProducts)
      );
      // alert('Item is added in the liked product')
      showAlertMessage(
        "Liked Product",
        `${product.name} added to liked products successfully!`
      );
    } else {
      // if product is liked at once time so it will remove from the liked array
      const updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.id !== product.id
      );
      setLikedProducts(updatedLikedProducts);

      // Store liked products in local storage
      localStorage.setItem(
        "likedProducts",
        JSON.stringify(updatedLikedProducts)
      );
    }
  };
  // yadi liked prduct phele present he to nahi dhikyga or nahi he to dhika dega invert karega
  const likedProductPrinted = () => {
    setShowLikedProducts((prevShowLikedProducts) => !prevShowLikedProducts);
  };

  // to give a alert for a liked product
  const showAlertMessage = (title, message) => {
    setShowAlert({ title, message })
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  // with the help of usestate we can access the local storage data
  useEffect(() => {
    const storedLikedProducts = localStorage.getItem("likedProducts");
    if (storedLikedProducts) {
      setLikedProducts(JSON.parse(storedLikedProducts));
    }
  }, []);
  return (
    <div>
      {/* <button onClick={() => navigate('/liked-products')} className="show-liked-button">
        Show Liked Products
      </button> */}

      <div className="shop-product-wrap row justify-content-center grid">
        {Products.map((product, i) => (
          <div key={i} className="col-lg-4 col-md-6 col-12">
            <div className="product-item">
              <div className="product-thumb">
                <div className="pro-thumb">
                  <img src={product.img} alt="" />
                </div>

                {/* Product action link */}
                <div className="product-action-link">
                  <Link to={`/shop/${product.id}`}>
                    <i className="icofont-eye"></i>
                  </Link>

                  {/* when heart button is clicked so item is add in the liked array */}
                  <button href="#" onClick={() => handleLike(product)}>
                    <i
                      className={`icofont-heart ${
                        likedProducts.some((p) => p.id === product.id)
                          ? "liked"
                          : ""
                      }`}
                    ></i>
                  </button>

                  <Link to="/cart-page">
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>

              {/* Product-content */}
              <div className="product-content">
                <h5>
                  <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </h5>

                <p className="productRating">
                  <Ratting />
                </p>

                <h6>${product.price}</h6>
              </div>
            </div>
          </div>
        ))}

        {showLikedProducts && <LikedProducts likedProducts={likedProducts} />}

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
    </div>
  );
};

export default ProductCard;
