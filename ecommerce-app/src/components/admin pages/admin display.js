import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal,Button } from "react-bootstrap";



const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/pro1/admin_disp.php`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [search]);

  const handleEditClick = async (productId) => {
    try {
      // Fetch product data for the selected product ID
      const response = await axios.post(`http://localhost/pro1/reactedit.php`, {
        id: productId,
      });

      // Set the product data and ID for editing
      setEditProductId(productId);
      setEditProductData(response.data);

      // Open the edit modal or pop-up
      // You can use a library like react-bootstrap, react-modal, or create your own modal component
      // For simplicity, let's assume you have a state to manage the modal's visibility
      // and a simple modal implementation with a save button
      setShowEditModal(true);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Make a request to your backend to save the changes
      const response = await axios.post(
        `http://localhost/pro1/reactsave.php`,
        {
          id: editProductId,
          ...editProductData,
        }
      );

      // Handle the response as needed
      console.log(response.data);

      // Close the edit modal or pop-up
      setShowEditModal(false);

      // Update the state or perform other actions based on the response
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      // Make a request to your backend delete endpoint, providing the product ID
      const response = await axios.post(
        `http://localhost/pro1/deleteprod.php`,
        { id: productId }
      );

      // Handle the response as needed
      console.log(response.data);

      // Update the state or perform other actions based on the response
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Enter product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="editName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  value={editProductData.name}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editDescription" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="editDescription"
                  rows="3"
                  value={editProductData.description}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="editPrice" className="form-label">
                  Price:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editPrice"
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              {/* Add other fields as needed */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="img-thumbnail img-fluid"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm btn-edit"
                    onClick={() => handleEditClick(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-delete"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
