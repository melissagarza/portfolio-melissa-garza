import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import setupFontAwesomeLibrary from './fontLibrary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './components/layout/Loading';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
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
          <Header />
          <Main />
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
