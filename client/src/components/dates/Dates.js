import React, { useContext, useEffect, Fragment } from 'react';
import { DateContext } from '../../context/date/DateState';
import { DateItem } from './DateItem';
import { Spinner } from '../layout/Spinner';

export const Dates = () => {
  const { dates, getDates, loading } = useContext(DateContext);

  useEffect(() => {
    getDates();
    // eslint-disable-next-line
  }, []);

  if (dates !== null && dates.length === 0 && !loading) {
    return <div className='text-center'>{''}</div>;
  }

  return (
    <Fragment>
      {dates !== null && !loading ? (
        <div>
          <div className='dates-main-header mtb-20 text-center'>
            <h2>DATE IDEAS</h2>
          </div>
          <div className='dates-container'>
            {dates.map((date) => (
              <DateItem key={date._id} date={date} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
