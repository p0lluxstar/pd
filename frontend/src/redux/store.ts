import { configureStore } from '@reduxjs/toolkit';
import { loaderReducer } from './slices/loaderSlice';
import { shopsReducer } from './slices/shopsSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    shops: shopsReducer,
  },
});

export default store;
