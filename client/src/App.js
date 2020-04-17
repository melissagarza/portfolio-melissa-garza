import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import setupFontAwesomeLibrary from './fontLibrary';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Routes from './components/routes/Routes';
import Footer from './components/layout/Footer';

const App = () => {

  setupFontAwesomeLibrary();

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Alert />
          <Routes />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
