import React, { useEffect, useState } from "react";
import PageHeader from "../component/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
const CartPage = () => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    //fetch cart data from the local storage
    // if the data is present so it will insert in the cart and that not yet so it would bw empty
    const storedCartItem = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(storedCartItem);
  }, []);

  // Total price
  const calculateTotalPrice = (item) => {
    // item price depends on the quantity of the product
    return item.price * item.quantity;
  };

  // handle quantity increase
  const handleIncrease = (item) => {
    item.quantity += 1;
    //  with the help of spread operator the previous product is also added
    setCartItem([...cartItem]);

    //  update local storage with new cart item
    localStorage.setItem("cart", JSON.stringify(cartItem));
  };

  // handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItem([...cartItem]);

      //update local storage with new cart item
      localStorage.setItem("cart", JSON.stringify(cartItem));
    }
  };

  // create a delete button to remove the cart item
  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItem.filter((item) => item.id !== itemToRemove.id);

    setCartItem(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //   cart subtotal
  const cartSubTotal = cartItem.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  //   order total
  const orderTotal = cartSubTotal;
  return (
    <div>
      <PageHeader title={"Shop Cart"} curPage={"Cart Page"} />
      <div className="shop-cart paddding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to="/shop">
                            <img src={item.img} alt="" />
                          </Link>
                        </div>

                        <div className="p-content">
                          <Link to="/shop">{item.name}</Link>
                        </div>
                      </td>

                      <td className="cat-price">$ {item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="cart-plus-minus-box"
                            name="qtybutton"
                            value={item.quantity}
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>

                      <td className="cat-toprice">
                        ${calculateTotalPrice(item)}
                      </td>

                      <td className="cat-edit">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <img src={delImgUrl} alt="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* cart top is ended here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
