import React from 'react';
import { Dates } from '../dates/Dates';
import { DatesForm } from '../dates/DatesForm';
import { DateGenerator } from '../dates/DateGenerator';

export const Home = () => {
  return (
    <div>
      <div className='grid-two grid-wrapper'>
        <DatesForm />
        <DateGenerator />
      </div>
      <Dates />
    </div>
  );
};
