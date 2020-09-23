import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layout
import { Navbar } from './components/layout/Navbar';

// Pages
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';

// Bring in Provider
import { DateProvider } from './context/date/DateState';
import { AuthProvider } from './context/auth/AuthState';

function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <Router>
          <Fragment>
            <Navbar />
            <div className='fixed-height container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </DateProvider>
    </AuthProvider>
  );
}

export default App;
