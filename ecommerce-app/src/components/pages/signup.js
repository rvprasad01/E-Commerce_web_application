import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Clear previous error messages when the user interacts with the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost/pro1/insert.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        // Registration successful
        setRegistrationSuccess(true);
        setErrorMessage('');
      } else {
        // Handle registration error
        const data = await response.json(); // Assuming the server sends JSON error messages
        setErrorMessage(data.message); // Display the error message in the component
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorMessage('An error occurred during registration');
    }
  };

  // Redirect to login page after successful registration
  if (registrationSuccess) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <p style={{ color: 'green', fontSize: '18px', textAlign: 'center' }}>
          Welcome, {formData.name}! Registration successful.
        </p>
        <p style={{ fontSize: '16px', textAlign: 'center' }}>
          Redirecting to login page...
        </p>
        {setTimeout(() => {
          window.location.href = '/Login';
        }, 3000)}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '350px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#007BFF' }}>Registration</h2>

        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#333' }}>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </label>

        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#333' }}>
          Username
          <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </label>

        <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#333' }}>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </label>

        <label style={{ display: 'block', marginBottom: '20px', fontSize: '14px', color: '#333' }}>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
        </label>

        <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', background: '#007BFF', color: 'white', cursor: 'pointer' }}>
          Register
        </button>

        <div className="col-12" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p className="small mb-0" style={{ color: '#333' }}>
            Already have an account? <a href="/Login" style={{ color: '#007BFF', textDecoration: 'underline' }}>Login</a>
          </p>
        </div>
      </form>

      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
