import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost/pro1/new.php");
      const allProducts = await response.json();
      console.log("All Products:", allProducts);
      // Assuming each product object has an 'image_path' field
      const productsWithQuantity = allProducts.map((product) => ({
        ...product,
        quantity: 1,
      }));

      setProducts(productsWithQuantity);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };
  const clearCart = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear the cart?"
    );
    if (isConfirmed) {
      localStorage.removeItem("cart");
      setCart([]);
      alert("Cart cleared!");
    }
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
    fetchProducts();
  }, []);

  useEffect(() => {
    const productsInCart = products.filter((product) =>
      cart.includes(product.id)
    );
    setProductsInCart(productsInCart);
  }, [cart, products]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((id) => id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert("Product removed from cart!");
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value) || 1; // Ensure a default value of 1 if parseInt returns NaN or undefined
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    navigate("/order", { state: { cart, products: productsInCart } });
  };

  return (
    <div className="container mt-4 w-50 ">
      <div
        className="card"
        style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "#343a40" }}>Shopping Cart</h2>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>

          {loading && <div className="text-center">Loading...</div>}

          {!loading && cart.length === 0 && (
            <p className="text-info">Your cart is empty. Continue shopping!</p>
          )}

          {!loading && cart.length > 0 && (
            <div>
              {productsInCart.map((product) => (
                <div key={product.id} className="card mb-3">
                  <div
                    className="card-img-top"
                    style={{
                      backgroundImage: `url('${product.image_path}')`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "200px", // Set the desired height
                    }}
                    alt={product.title}
                  />
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="form-group">
                      <div className="form-group">
                        <label
                          htmlFor={`quantity-${product.id}`}
                          style={{ color: "#007bff", fontWeight: "bold" }}
                        >
                          Quantity:
                        </label>
                        <div className="input-group">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() =>
                              handleQuantityChange(product.id, {
                                target: { value: product.quantity - 1 },
                              })
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            id={`quantity-${product.id}`}
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(product.id, e)
                            }
                            min="1"
                            style={{ maxWidth: "50px" }}
                          />
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() =>
                              handleQuantityChange(product.id, {
                                target: { value: product.quantity + 1 },
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      style={{ margin: "10px 0", padding: "10px" }}
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Checkout button */}
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
