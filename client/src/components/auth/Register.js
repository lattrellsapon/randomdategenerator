import React, { useContext, useState, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertState';
import { AuthContext } from '../../context/auth/AuthState';

export const Register = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { registerUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    // Redirect to homepage if authenticated
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // Set up useState
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Decontruct from the useState variable so it is easier to use
  const { name, email, password, password2 } = user;

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
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      registerUser({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='text-center fixed-height'>
      <h1>Account Register</h1>
      <form className='register-form-container' onSubmit={onSubmit}>
        <div className='mtb-20'>
          <label htmlFor='name' className="left">Name: </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            className='register-input'
          />
        </div>
        <div className='mtb-20'>
          <label htmlFor='email' className="left">Email Address: </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='register-input'
          />
        </div>

        <div className='mtb-20'>
          <label htmlFor='password' className="left">Password: </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            className='register-input'
          />
        </div>
        <div className='mtb-20'>
          <label htmlFor='password2' className="left">Confirm Password: </label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
            className='register-input'
          />
        </div>
        <div>
          <input type='submit' value='REGISTER' className='register-button' />
        </div>
      </form>
    </div>
  );
};
