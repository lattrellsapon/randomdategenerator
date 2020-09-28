import React, { useContext } from 'react';
import { DateRandomItem } from './DateRandomItem';
import { DateContext } from '../../context/date/DateState';

export const DateGenerator = () => {
  const { getRandomNumber, dates } = useContext(DateContext);

  return (
    <div className='generator-wrapper text-center'>
      {dates === null || dates.length === 0 ? (
        <div>
          <h2>Please enter in some date ideas</h2>
        </div>
      ) : (
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
      )}
    </div>
  );
};
