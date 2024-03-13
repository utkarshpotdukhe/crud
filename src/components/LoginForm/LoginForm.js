import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css';

export const loginUser = async (formData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: 'utkarsh',
    password: '12345',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await loginUser(formData);

    if (data) {
      navigate('/user-management');
    } else {
      setError(error.message);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            SIGN IN
          </button>
        </div>
        <div className="clearfix">
          <Link to="/forgot-password" className="float-right">
            Forgot Password?
          </Link>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      <div className="text-center">
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;