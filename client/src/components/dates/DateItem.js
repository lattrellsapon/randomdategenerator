import React, { useContext } from 'react';
import { DateContext } from '../../context/date/DateState';

export const DateItem = ({ date }) => {
  const { setCurrentDate, clearCurrentDate, deleteDate } = useContext(
    DateContext
  );

  const { dateName, dateDescription, id } = date;

  const onDelete = () => {
    deleteDate(id);
    clearCurrentDate();
  };

  return (
    <div className='flex-two date-item'>
      <div className='mtb-20'>
        <h2>{dateName}</h2>
        <p className='pl-20'>{dateDescription}</p>
      </div>
      <div className='buttons-wrapper'>
        <button
          className='date-button edit-button'
          onClick={() => {
            setCurrentDate(date);
          }}
        >
          <i className='far fa-edit'></i>
        </button>
        <button className='date-button delete-button' onClick={onDelete}>
          <i className='far fa-trash-alt'></i>
        </button>
      </div>
    </div>
  );
};
