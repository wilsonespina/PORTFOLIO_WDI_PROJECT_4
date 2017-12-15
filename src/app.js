import React from 'react';
import ReactDOM  from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/utility/Routes';
import Footer from './components/utility/Footer';
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
        <div>

          <div>
            {/* {Auth.isAuthenticated() && <Navbar />} */}
            <Navbar />
            {/* {Auth.isAuthenticated() && <BackButton />} */}
          </div>

          <main>
            <Routes />
          </main>

          <footer>
            <Footer />
          </footer>

        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
