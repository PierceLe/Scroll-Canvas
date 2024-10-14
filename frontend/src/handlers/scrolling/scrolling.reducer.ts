import { createSlice } from '@reduxjs/toolkit';
import { ScrollingController } from './scrolling.controller';

const scrollingController = ScrollingController.getInstance();

const initialState: any = {
  scrollings: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // GetScrollingsAPI
    builder.addCase(
      scrollingController.getScrollings.fulfilled,
      (state, action) => {
        return {
          ...state,
          scrollings: action.payload,
        };
      },
    );
    builder.addCase(
      scrollingController.getScrollings.rejected,
      (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // DeleteScrollAPI
    builder.addCase(
      scrollingController.deleteScrolling.fulfilled,
      (state, action) => {
        console.log(action.payload);
        return {
          ...state,
        };
      },
    );
    builder.addCase(
      scrollingController.deleteScrolling.rejected,
      (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;
export const { reducer: userReducer } = userSlice;
