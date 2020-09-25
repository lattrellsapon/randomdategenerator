import React, { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';
import { v4 } from 'uuid';

// Initial State
const alertState = [];

// Create Context
export const AlertContext = createContext(alertState);

// Provider Component
export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, alertState);

  // Actions will go here
  const setAlert = (msg, timeout = 5000) => {
    const id = v4();
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, id },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ALERT',
        payload: id,
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
