import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/AlertState';

export const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={`alert text-center mtb-20`} key={alert.id}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};
