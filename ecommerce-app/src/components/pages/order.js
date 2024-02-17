// import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  if (!state || !state.products || state.products.length === 0) {
    // Redirect to the cart page or handle this case differently
    return <p className="text-info">No products in the order.</p>;
  }

  const { products } = state;

  // Calculate total price
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleQuantityChange = (index, event) => {
    const newQuantity = parseInt(event.target.value);
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    // You may want to update the state or dispatch an action to handle the quantity change
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    console.log("Order Details:", {
      products: state.products,
      totalPrice,
    });

    // Redirect to the order confirmation page with the order details in the state
    navigate("/orderconfirm", {
      state: { products: state.products, totalPrice },
    });
  };

  return (
    <div
      className="container mt-4"
      style={{ background: "#f4f4f4", padding: "20px" }}
    >
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Order Page</h2>

          {products.map((product, index) => (
            <div key={product.id} className="card mb-3">
              <div
                className="card-img-top"
                style={{
                  backgroundImage: `url('${product.image_path}')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "200px", // Set the desired height
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <div className="form-group">
                  <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`quantity-${product.id}`}
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                    min="1"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-right">
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
