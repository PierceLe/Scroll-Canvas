import { createSlice } from '@reduxjs/toolkit';
import { AuthController } from './auth.controller';
import { AuthState } from './types';
import { User } from '@frontend/repositories';

const authController = AuthController.getInstance();

const initialState: AuthState = {
  currentUser: {},
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // RegisterAPI
    builder.addCase(authController.register.pending, state => {
      state.currentUser.isLoading = true;
    });
    builder.addCase(
      authController.register.fulfilled,
      (state, action): AuthState => {
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
      authController.register.rejected,
      (state, action): AuthState => {
        return {
          ...state,
          currentUser: {
            isLoading: false,
            error: action.payload,
          },
        };
      },
    );

    // LoginAPI
    builder.addCase(
      authController.login.fulfilled,
      (state, action): AuthState => {
        return {
          ...state,
        };
      },
    );
    builder.addCase(
      authController.login.rejected,
      (state, action): AuthState => {
        return {
          ...state,
          error: action.payload,
        };
      },
    );
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export const { reducer: authReducer } = authSlice;
