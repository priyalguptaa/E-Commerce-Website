import React, { useState } from "react";
const desc =
  "Crafted from a soft-touch fabrication cut in a tapered fit silhouette, these track pants are defined with a muted pattern all-over for a minimal aesthetic while the brands infamous 3-stripes to the legs offer instant brand recognition.";
const ProductDisplay = ({ item }) => {
  // console.log(item)
  const { name, id, price, seller, ratingsCount, quantity } = item;

  // this is basically used to design the selection process in detaild acrea of product
  const [prequantity, setQuantity] = useState(quantity);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  const handleSizeChange=(e)=>{
    setSize(e.target.value)
  }
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
        <form>
            <div className="select-product size">
              <select value={size} onChange={handleSizeChange}>
                <option>Select Size</option>
                <option value="SM">SM</option>
                <option value="MD">MD</option>
                <option value="LG">LG</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
