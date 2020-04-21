import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let stateCurr = {
  auth: {
    token: null
  }
};
store.subscribe(() => {
  let statePrev = stateCurr;
  stateCurr = store.getState();
  if (statePrev.auth.token !== stateCurr.auth.token) {
    setAuthToken(stateCurr.auth.token);
  }
});

export const persistor = persistStore(store);
