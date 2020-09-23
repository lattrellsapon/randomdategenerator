import React, { useContext, Fragment } from 'react';
import { DateContext } from '../../context/date/DateState';

export const DateRandomItem = () => {
  const { randomDate } = useContext(DateContext);

  if (randomDate === null) {
    return <Fragment>{''}</Fragment>;
  }

  const { dateName, dateDescription } = randomDate;

  return (
    <div className='random-date'>
      <h2>{dateName}</h2>
      <p>{dateDescription}</p>
    </div>
  );
};
