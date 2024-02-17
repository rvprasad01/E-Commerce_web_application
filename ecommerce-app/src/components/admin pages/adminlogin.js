import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    setLoading(true);
    setError('');

    const response = await fetch('http://localhost/pro1/adminlogin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      console.log('Login response:', data);

      if (data.status === 'success') {
        console.log('Login successful');
        setUsername('');
        setPassword('');
        
        // Redirect to the Add page
        navigate('/Add');
      } else {
        console.error('Login failed:', data.message);
        setError('Invalid username or password');
      }
    } else {
      console.error('Unexpected response format:', contentType);
    }
  } catch (error) {
    console.error('Error during login:', error.message || 'Unknown error');
    setError('An unexpected error occurred');
  } finally {
    setLoading(false);
  }
};

const handleAdminLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007BFF' }}> Admin Login</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          padding: '30px',
          border: '1px solid #007BFF',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          background: 'white',
        }}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{ color: '#007BFF' }}>Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ marginBottom: '15px', transition: 'background-color 0.3s', ':hover': { backgroundColor: '#f1f1f1' } }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword5" className="form-label" style={{ color: '#007BFF' }}>Password</label>
          <input
            type="password"
            id="inputPassword5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
            style={{ marginBottom: '15px', transition: 'background-color 0.3s', ':hover': { backgroundColor: '#f1f1f1' } }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !username || !password}
          style={{
            padding: '12px',
            borderRadius: '5px',
            background: '#007BFF',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            ':hover': { backgroundColor: '#0056b3' },
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button type="button" className="btn btn-outline-secondary mt-3" onClick={handleAdminLoginClick}>User Login</button>

        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}             
       
      </form>
    </div>
  

  );
}

export default LoginPage;
