import { configureStore } from '@reduxjs/toolkit';
import { shopsReducer } from './slices/shopsSlice';

const store = configureStore({
  reducer: {
    shops: shopsReducer,
  },
});

export default store;
