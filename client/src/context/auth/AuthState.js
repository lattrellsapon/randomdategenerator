import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

// Import setAuthToken for x-auth-token
import setAuthToken from '../../utils/SetAuthToken';

// Initial State
const authState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

// Create Context
export const AuthContext = createContext(authState);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, authState);

  // Actions will go here

  // Load User
  const loadUser = async () => {
    // load token into Global Headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  // Register User
  const registerUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      // Add load user here because we want the user to be logged in straight away
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const logInUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logOutUser = () => {
    dispatch({
      type: 'LOGOUT'
    })
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: 'CLEAR_ERRORS',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        logInUser,
        logOutUser,
        loadUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
