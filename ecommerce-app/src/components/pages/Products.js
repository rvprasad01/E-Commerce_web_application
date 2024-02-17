import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from the server
    axios
      .get("http://localhost/pro1/new.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Invalid data received from the server");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      })
      .finally(() => setLoading(false));

    // Retrieve existing cart items from localStorage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
  }, []);

  const addToCart = (productId) => {
    // Check if the product is already in the cart
    const isProductInCart = cart.includes(productId);

    if (!isProductInCart) {
      // Add the product ID to the cart
      const newCart = [...cart, productId];

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));

      // Update the local state to reflect the change
      setCart(newCart);

      alert("Product added to cart!");
    } else {
      // Product is in the cart, remove it
      removeFromCart(productId);
    }
  };

  const removeFromCart = (productId) => {
    // Remove the productId from the cart array
    const updatedCart = cart.filter((id) => id !== productId);

    // Update the localStorage with the updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the state to reflect the change
    setCart(updatedCart);

    alert("Product removed from cart!");
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Products Page</h2>

          {loading && <div className="text-center">Loading...</div>}

          {!loading && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.map((product) => (
                <div className="col" key={product.id}>
                  <div className="card h-100">
                    <img src={product.image_path} alt={product.title} />

                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">{product.price}</li>
                      <li className="list-group-item">{product.desc}</li>
                    </ul>
                    <div className="card-body">
                      <button
                        onClick={() => {
                          if (cart.includes(product.id)) {
                            // If the product is in the cart, remove it
                            const updatedCart = cart.filter(
                              (id) => id !== product.id
                            );
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updatedCart)
                            );
                            setCart(updatedCart);
                          } else {
                            // If the product is not in the cart, add it
                            addToCart(product.id);
                          }
                        }}
                        className={`btn btn-warning shadow mx-3 ${
                          cart.includes(product.id) ? "btn-danger" : ""
                        }`}
                      >
                        {cart.includes(product.id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                      <Link
                        to={`/Order?products=${products
                          .map((product) => product.id)
                          .join(",")}`}
                        className="btn btn-warning shadow"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Products;
