import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('price', formData.price);
      formDataWithImage.append('image', e.target.image.files[0]);

      const response = await axios.post('http://localhost/pro1/addreact.php', formDataWithImage);
      console.log([...formDataWithImage.entries()]);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
  
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Image:
            <input type="file" name="image" accept="image/*" className="form-control" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    
  );
};

export default MyForm;
