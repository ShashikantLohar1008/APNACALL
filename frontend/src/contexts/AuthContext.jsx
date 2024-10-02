import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import httpStatus from "http-status";  // Ensure httpStatus is imported

// Create the AuthContext
export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users" // Add protocol to baseURL
});

export const AuthProvider = ({ children }) => {
    // Define state for user data
    const [userData, setUserData] = useState(null);

    // Initialize useNavigate inside the component
    const navigate = useNavigate();

    // Register function
    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });
            if (request.status === httpStatus.CREATED) {
                return request.data.message;  // Return success message
            }
        } catch (err) {
            throw err;
        }
    };

    // Login function
    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);  // Save token in local storage
                navigate("/dashboard");  // Navigate to a protected route after login
            }
        } catch (err) {
            throw err;
        }
    };

    // Provide the state and handler functions
    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};
