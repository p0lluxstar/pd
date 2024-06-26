import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {};

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setShops: (state, action: PayloadAction<object>) => {
      state = action.payload;
      return state;
    },
  },
});

export const shopsActions = shopsSlice.actions;
export const shopsReducer = shopsSlice.reducer;
