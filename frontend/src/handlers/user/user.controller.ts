import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '@frontend/api/user';

export class UserController {
  private static instance: UserController;
  private userService: UserService = UserService.getInstance();

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  public getCurrentUser = createAsyncThunk(
    'getCurrentUserAPI',
    async (_, { rejectWithValue }) => {
      const fetchFn = this.userService.getCurrentUser({});

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public getUsers = createAsyncThunk(
    'getUsersAPI',
    async (_, { rejectWithValue }) => {
      const fetchFn = this.userService.getUsers({});

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public updateUser = createAsyncThunk<any, any>(
    'updateUserAPI',
    async (data, { rejectWithValue }) => {
      const fetchFn = this.userService.updateUser(data.username, {
        data: {
          email: data?.email,
          firstName: data?.firstName,
          lastName: data?.lastName,
          phone: data?.phoneNumber,
        },
      });

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public updateUsername = createAsyncThunk<any, any>(
    'updateUsernameAPI',
    async (data, { rejectWithValue }) => {
      const fetchFn = this.userService.updateUser(data.currentUsername, {
        data: {
          username: data?.newUsername,
        },
      });

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public updatePassword = createAsyncThunk<any, any>(
    'updatePasswordAPI',
    async (data, { rejectWithValue }) => {
      const fetchFn = this.userService.updatePassword(data.id, {
        data: {
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword,
        },
      });

      try {
        const response = await fetchFn();
        return response;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );

  public deleteUser = createAsyncThunk<any, any>(
    'deleteUserAPI',
    async (username, { rejectWithValue }) => {
      const fetchFn = this.userService.deleteUser(username, {});

      try {
        await fetchFn();
        return { username };
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    },
  );
}
