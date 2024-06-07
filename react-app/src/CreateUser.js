import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateUser = () => {
  const [blnEdit, setEdit] = useState(false);

  const [userFormData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      setEdit(true)
      setFormData(location.state);
    }
    else {
      setEdit(false)
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...userFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    let method = 'POST';
    if (blnEdit) {
      method = 'PUT';
    }

    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/user/user_api', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(userFormData)
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error creating user:', response.statusText);
        if(response.status == 401) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="card p-4 m-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={userFormData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={userFormData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userFormData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userFormData.password}
            onChange={handleChange}
            required
          />
        </div>
        {blnEdit ? (
          <button type="submit" className="btn btn-primary">Update</button>
        ) : (
          <button type="submit" className="btn btn-primary">Submit</button>
        )}

      </form>
    </div>
  );
};

export default CreateUser;
