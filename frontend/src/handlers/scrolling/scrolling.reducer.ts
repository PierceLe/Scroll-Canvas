import { createSlice } from '@reduxjs/toolkit';
import { ScrollingController } from './scrolling.controller';
import { toast } from 'react-toastify';

const scrollingController = ScrollingController.getInstance();

const initialState: any = {
  scrollings: [],
};

export const scrollSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    createScrollSuccess: (state, action) => {
      console.log(action)
      return {
        ...state,
        scrollings: [
          action.payload,
          ...state.scrollings
        ]
      };
    },
  },
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
        toast.info('Delete scroll successfully!');
        console.log(action.payload);
        return {
          ...state,
        };
      },
    );
    builder.addCase(
      scrollingController.deleteScrolling.rejected,
      (state, action) => {
        toast.error('Delete scroll unsuccessfully!');
        return {
          ...state,
          error: action.payload,
        };
      },
    );
  },
});

// eslint-disable-next-line no-empty-pattern
export const { createScrollSuccess } = scrollSlice.actions;
export const { reducer: scrollReducer } = scrollSlice;
