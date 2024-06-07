import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const PrivateRoute = ({ element }) => {
  const auth = useAuth();
  console.log(auth);
  return localStorage.getItem('access_token') ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
