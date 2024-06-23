import { configureStore } from '@reduxjs/toolkit';
import { loaderChartReducer } from './slices/loaderChartSlice';
import { loaderReducer } from './slices/loaderSlice';
import { shopsReducer } from './slices/shopsSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    loaderChart: loaderChartReducer,
    shops: shopsReducer,
  },
});

export default store;
