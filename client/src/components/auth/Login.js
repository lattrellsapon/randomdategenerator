import React, { useState, useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertState';
import { AuthContext } from '../../context/auth/AuthState';

export const Login = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { logInUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    // Redirect to homepage if authenticated
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (
      error === 'Email not found in the system' ||
      error === 'Incorrect password'
    ) {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  // Set up useState
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Decontruct from the useState variable so it is easier to use
  const { email, password } = user;

  // On Change for the form fields
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // On Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill all fields');
    } else {
      logInUser(user);
    }
  };
  return (
    <div className='text-center fixed-height'>
      <h1>Account Login</h1>
      <form className='register-form-container' onSubmit={onSubmit}>
        <div className='mtb-20'>
          <label htmlFor='email' className='left'>
            Email Address:{' '}
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='register-input'
          />
        </div>
        <div className='mtb-20'>
          <label htmlFor='password' className='left'>
            Password:{' '}
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            className='register-input'
          />
        </div>

        <div>
          <input type='submit' value='LOGIN' className='register-button' />
        </div>
      </form>
    </div>
  );
};
