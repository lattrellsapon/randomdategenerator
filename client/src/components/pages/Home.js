import React, { useContext, useEffect } from 'react';
import { Dates } from '../dates/Dates';
import { DatesForm } from '../dates/DatesForm';
import { DateGenerator } from '../dates/DateGenerator';
import { AuthContext } from '../../context/auth/AuthState';
import { DateContext } from '../../context/date/DateState';

export const Home = () => {
  const { loadUser } = useContext(AuthContext);
  const { dates } = useContext(DateContext);

  // Load user as soon as the component loads
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='min-height'>
      <div className='grid-two grid-wrapper'>
        <DatesForm />
        <DateGenerator />
      </div>
      <Dates />
    </div>
  );
};
