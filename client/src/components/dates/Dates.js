import React, { useContext } from 'react';
import { DateContext } from '../../context/date/DateState';
import { DateItem } from './DateItem';

export const Dates = () => {
  const { dates } = useContext(DateContext);

  if (dates.length === 0) {
    return (
      <div className='text-center'>
        <p>Please add date ideas.</p>{' '}
      </div>
    );
  }

  return (
    <div>
      <div className='dates-main-header mtb-20 text-center'>
        <h2>DATE IDEAS</h2>
      </div>
      <div className='dates-container'>
        {dates.map((date) => (
          <DateItem key={date.id} date={date} />
        ))}
      </div>
    </div>
  );
};
