import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
