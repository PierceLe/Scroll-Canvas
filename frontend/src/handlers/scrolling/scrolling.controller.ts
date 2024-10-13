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

  public getScrollings = createAsyncThunk(
    'getScrollingsAPI',
    async (_, { rejectWithValue }) => {
      const fetchFn = this.scrollingService.getScrollings({});

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );
}
