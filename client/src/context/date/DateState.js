import React, { createContext, useReducer } from 'react';
import DateReducer from './DateReducer';
import axios from 'axios';

// Initial State
const dateState = {
  dates: null,
  currentDate: null,
  error: null,
  randomDate: null,
  randomNumber: null,
};

// Create Context
export const DateContext = createContext(dateState);

// Provider Component
export const DateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DateReducer, dateState);

  // Actions will go here

  // Get Date Ideas
  const getDates = async () => {
    try {
      const res = await axios.get('/api/dates');

      dispatch({
        type: 'GET_DATES',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'DATE_ERROR',
        payload: err.response.msg,
      });
    }
  };

  // Generate a random number
  function getRandomNumber() {
    // let number = Math.floor(Math.random() * dateState.dates.length);
    dispatch({
      type: 'RANDOM_DATE',
    });
  }

  // Add a new date idea
  async function addDate(newDate) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/dates', newDate, config);

      dispatch({
        type: 'ADD_DATE',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'DATE_ERROR',
        payload: err.response.msg,
      });
    }
  }

  // Set current Date
  function setCurrentDate(date) {
    dispatch({
      type: 'CURRENT_DATE',
      payload: date,
    });
  }

  // Clear current date
  function clearCurrentDate() {
    dispatch({
      type: 'CLEAR_DATE',
    });
  }

  // Update Date
  async function updateDate(currentDate) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/dates/${currentDate._id}`,
        currentDate,
        config
      );

      dispatch({
        type: 'UPDATE_DATE',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'DATE_ERROR',
        payload: err.response.msg,
      });
    }
  }

  // Delete Date
  async function deleteDate(id) {
    try {
      await axios.delete(`/api/dates/${id}`);
      dispatch({
        type: 'DELETE_DATE',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'DATE_ERROR',
        payload: err.response.msg,
      });
    }
  }

  // Clear Dates
  const clearDates = async () => {
    dispatch({
      type: 'CLEAR_DATES',
    });
  };

  return (
    <DateContext.Provider
      value={{
        dates: state.dates,
        currentDate: state.currentDate,
        error: state.error,
        randomDate: state.randomDate,
        getRandomNumber,
        getDates,
        addDate,
        setCurrentDate,
        clearCurrentDate,
        updateDate,
        deleteDate,
        clearDates,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
