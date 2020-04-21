import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import alert from './alert';
import auth from './auth';
import exercise from './exercise';

const persistConfigRoot = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const persistConfigAuth = {
  key: 'auth',
  storage: storage
};

const combinedReducers = combineReducers({
  alert,
  auth: persistReducer(persistConfigAuth, auth),
  exercise
});

const rootReducer = persistReducer(persistConfigRoot, combinedReducers);

export default rootReducer;
