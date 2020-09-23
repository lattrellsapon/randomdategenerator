import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

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

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
