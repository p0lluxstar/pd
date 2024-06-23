import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loaderChartSlice = createSlice({
  name: 'loaderChart',
  initialState,
  reducers: {
    setLoaderChart: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const loaderChartActions = loaderChartSlice.actions;
export const loaderChartReducer = loaderChartSlice.reducer;
