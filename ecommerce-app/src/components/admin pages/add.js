import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from './add prod'; 
import AdminProducts from './admin display';


const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/AdminLogin');
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "5rem" }}>
      <div className="g-col-4 ms-3">
        <h2>Add Product</h2>
        <AddProduct />      
      </div>
            <button className="btn btn-danger" style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleLogout}>
                Logout
            </button>
      <div className="g-col-8">
        <h2 style={{ textAlign: "center" }}>Product List</h2>
        <AdminProducts />
      </div>
    </div>
    
  );
}

export default AdminPage;
