import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/utility/Routes';
import Navbar from './components/utility/Navbar';
import Auth from './lib/Auth';
import BackButton from './components/utility/BackButton';

import 'font-awesome/css/font-awesome.css';
import 'react-router-bootstrap';
import 'bootstrap-css-only';
import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container-fluid">

          <header>
            <Navbar />
            {Auth.isAuthenticated() && <BackButton />}
          </header>

          <main>
            <Routes />
          </main>

        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
