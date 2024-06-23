import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length && !roles.includes(parseInt(userRole))) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
