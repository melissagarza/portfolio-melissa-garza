import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import alert from './alert';
import auth from './auth';
import exercise from './exercise';
import roadmap from './roadmap';

const persistConfigRoot = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth']
};

const persistConfigAuth = {
  key: 'auth',
  storage: storage
};

const combinedReducers = combineReducers({
  alert,
  auth: persistReducer(persistConfigAuth, auth),
  exercise,
  roadmap
});

const rootReducer = persistReducer(persistConfigRoot, combinedReducers);

export default rootReducer;
