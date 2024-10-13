import { createSlice } from '@reduxjs/toolkit';
import { UserController } from './user.controller';
import { UserState } from './types';
import { User } from '@frontend/repositories';
import { clearCookie } from '@frontend/helpers/cookie';
import { toast } from 'react-toastify';

const userController = UserController.getInstance();

const initialState: UserState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // GetCurrentUserAPI
    builder.addCase(userController.getCurrentUser.pending, state => {
      state.currentUser.isLoading = true;
    });
    builder.addCase(
      userController.getCurrentUser.fulfilled,
      (state, action): UserState => {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            isLoading: false,
            data: User.buildUser(action.payload),
          },
        };
      },
    );
    builder.addCase(
      userController.getCurrentUser.rejected,
      (state, action): UserState => {
        return {
          ...state,
          currentUser: {
            isLoading: false,
            error: action.payload,
          },
        };
      },
    );

    // GetUsersAPI
    builder.addCase(
      userController.getUsers.fulfilled,
      (state, action): UserState => {
        // const { currentPage, pageSize, totalCount } = metadata;

        return {
          ...state,
          users: action.payload.map((user: any): User => User.buildUser(user)),
          // currentPage,
          // pageSize,
          // totalUsers: totalCount,
        };
      },
    );
    builder.addCase(
      userController.getUsers.rejected,
      (state, action): UserState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdateUserAPI
    builder.addCase(
      userController.updateUser.fulfilled,
      (state, action): UserState => {
        console.log(action.payload);
        toast.info('Update user successfully!');

        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updateUser.rejected,
      (state, action): UserState => {
        toast.error('Update user unsuccessfully!');
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdateUsernameAPI
    builder.addCase(
      userController.updateUsername.fulfilled,
      (state, action): UserState => {
        console.log(action.payload);
        toast.info('Update username successfully!');
        clearCookie('Authentication');

        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updateUsername.rejected,
      (state, action): UserState => {
        toast.error('Update username unsuccessfully!');
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // UpdatePasswordAPI
    builder.addCase(
      userController.updatePassword.fulfilled,
      (state, action): UserState => {
        console.log(action.payload);
        toast.info('Update password successfully!');
        clearCookie('Authentication');

        return {
          ...state,
        };
      },
    );
    builder.addCase(
      userController.updatePassword.rejected,
      (state, action): UserState => {
        toast.error('Update password unsuccessfully!');
        return {
          ...state,
          error: action.payload,
        };
      },
    );

    // DeleteUserAPI
    builder.addCase(
      userController.deleteUser.fulfilled,
      (state, action): UserState => {
        const users = state.users?.filter(
          item => item.username !== action.payload.username,
        );

        return {
          ...state,
          users,
        };
      },
    );
    builder.addCase(
      userController.deleteUser.rejected,
      (state, action): UserState => {
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
