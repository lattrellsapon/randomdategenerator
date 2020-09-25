import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { DateContext } from '../../context/date/DateState';

export const Navbar = () => {
  const { isAuthenticated, logOutUser, user } = useContext(AuthContext);

  const { clearDates } = useContext(DateContext);

  const onLogOut = () => {
    logOutUser();
    clearDates();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogOut}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='flex-container'>
      <div className='nav-logo'>
        <h2>Random Date Generator</h2>
      </div>
      <div className='nav-list'>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};
