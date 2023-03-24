import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({  isAdmin,children }) => {
    const { isAuth , user } = useSelector((state) => state.user);
    console.log(isAdmin);
         
           if (!isAuth) {
             return <Navigate to="/login" />;
           }

           if (isAdmin === true && user.role !== "admin") {
             return <Navigate to="/unauthorized" />;
           }

           return children
        }

export default ProtectedRoute