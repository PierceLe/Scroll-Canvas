import { ScrollingService } from '@frontend/api/scrolling';
import { createAsyncThunk } from '@reduxjs/toolkit';

export class ScrollingController {
  private static instance: ScrollingController;
  private scrollingService: ScrollingService = ScrollingService.getInstance();

  public static getInstance(): ScrollingController {
    if (!ScrollingController.instance) {
      ScrollingController.instance = new ScrollingController();
    }

    return ScrollingController.instance;
  }

  public getScrollings = createAsyncThunk<any, any>(
    'getScrollingsAPI',
    async (params, { rejectWithValue }) => {
      const fetchFn = this.scrollingService.getScrollings({ params });

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public uploadScrolling = createAsyncThunk<any, any>(
    'updateScrollingAPI',
    async (data, { rejectWithValue }) => {
      const fetchFn = this.scrollingService.uploadScrolling({
        data,
      });

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public deleteScrolling = createAsyncThunk<any, any>(
    'deleteScrollingAPI',
    async (data, { rejectWithValue }) => {
      const fetchFn = this.scrollingService.deleteScrolling(data.id, {});

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );
}
