import React, { useContext, useEffect, useState } from 'react';
import { DateContext } from '../../context/date/DateState';

export const DatesForm = () => {
  const { addDate, currentDate, clearCurrentDate, updateDate } = useContext(
    DateContext
  );

  useEffect(() => {
    if (currentDate !== null) {
      setDate(currentDate);
    } else {
      setDate({
        dateName: '',
        dateDescription: '',
      });
    }
    // eslint-disable-next-line
  }, [DateContext, currentDate]);

  const [date, setDate] = useState({
    dateName: '',
    dateDescription: '',
  });

  const { dateName, dateDescription } = date;

  const onChange = (e) => {
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentDate === null) {
      addDate(date);
    } else {
      updateDate(date);
    }
    setDate({
      dateName: '',
      dateDescription: '',
    });
    clearAll();
  };

  const clearAll = () => {
    clearCurrentDate();
  };

  return (
    <div className='form-wrapper'>
      <h3>{currentDate ? 'EDIT DATE IDEA' : 'ADD DATE IDEA'}</h3>
      <form onSubmit={onSubmit} className='mt-20'>
        <div>
          <label htmlFor='dateName'>Date Idea: </label>
          <input
            type='text'
            name='dateName'
            className='date-idea'
            value={dateName}
            onChange={onChange}
            required
          />
        </div>
        <div className='mtb-20'>
          <label htmlFor='dateDescription'>Date Description (Optional): </label>
          <textarea
            className='date-description'
            name='dateDescription'
            value={dateDescription}
            onChange={onChange}
          ></textarea>
        </div>
        <div>
          <input
            type='submit'
            value={currentDate ? 'UPDATE' : 'ADD'}
            className='submit-button'
          />
        </div>
        {currentDate && (
          <div className='mtb-20'>
            <button className='clear-button' onClick={clearAll}>
              CLEAR
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
