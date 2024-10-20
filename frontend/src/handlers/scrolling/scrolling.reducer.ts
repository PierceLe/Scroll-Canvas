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
    createScrollPending: state => {
      return {
        ...state,
        isCreateScrollPending: true,
      };
    },
    createScrollSuccess: (state, action) => {
      return {
        ...state,
        isCreateScrollPending: false,
        scrollings: [action.payload, ...state.scrollings],
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
      (state) => {
        toast.info('Delete scroll successfully!');
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
export const { createScrollSuccess, createScrollPending } = scrollSlice.actions;
export const { reducer: scrollReducer } = scrollSlice;
