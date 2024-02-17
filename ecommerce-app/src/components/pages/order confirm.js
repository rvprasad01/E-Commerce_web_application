import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmPage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.products || state.products.length === 0) {
    // Redirect to the home page or handle this case differently
    return <p className="text-danger">Invalid order details.</p>;
  }

  const { products, totalPrice } = state;

  return (
    <div
      className="container mt-4"
      style={{ background: "#f4f4f4", padding: "20px" }}
    >
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Order Confirmation</h2>

          {products.map((product) => (
            <div key={product.id} className="card mb-3">
              <img
                src={product.image_path}
                className="card-img-top"
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
              </div>
            </div>
          ))}

          <div className="text-right">
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>

          <p className="text-success">
            Order confirmed. Thank you for your purchase!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;
