import React, { useState } from "react";
import { Link } from "react-router-dom";
const desc =
  "Crafted from a soft-touch fabrication cut in a tapered fit silhouette, these track pants are defined with a muted pattern all-over for a minimal aesthetic while the brands infamous 3-stripes to the legs offer instant brand recognition.";
const ProductDisplay = ({ item }) => {
  // console.log(item)
  const { name, id, price, seller, ratingsCount, quantity, img } = item;

  // this is basically used to design the selection process in detaild acrea of product
  const [prequantity, setQuantity] = useState(quantity);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDecrease = () => {
    if (prequantity > 1) setQuantity(prequantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(prequantity + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: id,
      img: img,
      name: name,
      price: price,
      quantity: prequantity,
      size: size,
      color: color,
      coupon: coupon,
    };
    // console.log(product)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += prequantity;
    } else {
      existingCart.push(product);
    }

    // update local storage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // reset field
    setQuantity(1);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon(" ");
  };
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span>{ratingsCount} review</span>
        </p>
        <h4>{seller}</h4>
        <h6>${price}</h6>
        <p>{desc}</p>
      </div>

      {/* cart-componenets */}
      <div>
        <form onSubmit={handleSubmit}>
          {/* Size */}
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          {/* Color */}
          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>Pink</option>
              <option>Ash</option>
              <option>Red</option>
              <option>White</option>
              <option>Black</option>
              <option>Blue</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          {/* Cart plus minus */}
          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              id="qtybutton"
              value={prequantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>
          {/* Coupon field */}
          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
          {/* Button section */}
          <div className="button-section">
            <button type="submit" className="lab-btn">
              Add to Cart
            </button>

            {/* Apply margin to create space */}
            <Link
              to="/cart-page"
              className="lab-btn bg-primary"
              style={{ marginLeft: "90px" }}
            >
              <span>Check Out</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
