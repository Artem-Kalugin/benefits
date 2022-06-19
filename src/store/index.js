import { combineReducers, configureStore } from '@reduxjs/toolkit';

import navbarReducer from './navbar/navbarSlice';

import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: combineReducers({
    navbar: navbarReducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      createLogger({
        collapsed: true,
        predicate: () => __DEV__,
      }),
    ),
});

export default store;
