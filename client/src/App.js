import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Alerts } from './components/layout/Alerts';

// Bring in private route
import { PrivateRoute } from './components/routing/PrivateRoute';

// Pages
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';

// Bring in Provider
import { DateProvider } from './context/date/DateState';
import { AuthProvider } from './context/auth/AuthState';
import { AlertProvider } from './context/alert/AlertState';

// Bring in  SetAuthToken
import setAuthToken from './utils/SetAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <AlertProvider>
          <Router>
            <Fragment>
              <Navbar />
              <div className='fixed-height container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;
