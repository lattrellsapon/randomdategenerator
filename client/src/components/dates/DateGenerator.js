import React, { useContext } from 'react';
import { DateRandomItem } from './DateRandomItem';
import { DateContext } from '../../context/date/DateState';

export const DateGenerator = () => {
  const { getRandomNumber } = useContext(DateContext);

  return (
    <div className='generator-wrapper text-center'>
      <div>
        <button
          className='generator-button'
          onClick={() => {
            getRandomNumber();
          }}
        >
          GENERATE
        </button>
        <p className='mt-20'>Or browse the list below</p>
      </div>
      <div>
        <DateRandomItem />
      </div>
    </div>
  );
};
