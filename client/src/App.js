import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import setupFontAwesomeLibrary from './fontLibrary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Loading from './components/layout/Loading';
import Routes from './components/routes/Routes';
import Footer from './components/layout/Footer';

const App = () => {

  useEffect(() => {
    setAuthToken(store.getState().auth.token);
    store.dispatch(loadUser());
  });

  setupFontAwesomeLibrary();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router>
          <Navbar />
          <div className="container">
            <Alert />
            <Routes />
          </div>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
