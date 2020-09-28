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
      <li>
        Hello <span className='user-highlight'>{user && user.name}</span>
      </li>
      <li>
        <a href='#!' onClick={onLogOut} className='logout-button'>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register' className='guest-links'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/login' className='guest-links'>
          Log In
        </Link>
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
