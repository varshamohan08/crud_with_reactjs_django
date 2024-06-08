import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateTodo = () => {
  const [blnEdit, setEdit] = useState(false);

  const [todoFormData, setFormData] = useState({
    name: '',
    notes: '',
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
      ...todoFormData,
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
      const response = await fetch('http://127.0.0.1:8000/todo/todo_api', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(todoFormData)
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error creating todo:', response.statusText);
        if(response.status == 401) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="card p-4 m-5">
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={todoFormData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <input
            type="text"
            className="form-control"
            id="notes"
            name="notes"
            value={todoFormData.notes}
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

export default CreateTodo;
