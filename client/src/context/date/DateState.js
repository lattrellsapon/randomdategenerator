import React, { createContext, useReducer } from 'react';
import DateReducer from './DateReducer';
import axios from 'axios';

import { v4 } from 'uuid';

// Initial State
const dateState = {
  dates: [
    {
      id: 1,
      dateName: 'Go to the beach',
      dateDescription: 'Hangout and make Tiktok',
    },
    {
      id: 2,
      dateName: 'Watch a basketball game together',
      dateDescription: 'Go to America and watch NBA',
    },
    {
      id: 3,
      dateName: 'Go to Queenstown',
      dateDescription: '',
    },
    {
      id: 4,
      dateName: 'Go to Hamilton',
      dateDescription: '',
    },
    {
      id: 5,
      dateName: 'Go to Canada',
      dateDescription: '',
    },
  ],
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

  // Generate a random number
  function getRandomNumber() {
    let number = Math.floor(Math.random() * dateState.dates.length);
    dispatch({
      type: 'RANDOM_DATE',
      payload: number,
    });
  }

  // Add a new date idea
  function addDate(newDate) {
    newDate.id = v4();
    dispatch({
      type: 'ADD_DATE',
      payload: newDate,
    });
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
  function updateDate(currentDate) {
    dispatch({
      type: 'UPDATE_DATE',
      payload: currentDate,
    });
  }

  // Delete Date
  function deleteDate(id) {
    dispatch({
      type: 'DELETE_DATE',
      payload: id,
    });
  }

  return (
    <DateContext.Provider
      value={{
        dates: state.dates,
        currentDate: state.currentDate,
        error: state.error,
        randomDate: state.randomDate,
        getRandomNumber,
        addDate,
        setCurrentDate,
        clearCurrentDate,
        updateDate,
        deleteDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
