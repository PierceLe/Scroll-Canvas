import { createSlice } from '@reduxjs/toolkit';
import { AuthController } from './auth.controller';
import { AuthState } from './types';
import { clearCookie, setCookie } from '@frontend/helpers/cookie';

const authController = AuthController.getInstance();

const initialState: AuthState = {
  currentUser: {},
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout: (state) => {
      clearCookie('Authentication');
      window.location.reload();

      return {
        ...state,
      };
    },
  },
  extraReducers: builder => {
    // RegisterAPI
    builder.addCase(authController.register.pending, state => {
      state.currentUser.isLoading = true;
    });
    builder.addCase(
      authController.register.fulfilled,
      (state): AuthState => {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            isLoading: false,
            // data: User.buildUser(action.payload),
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
        const token = action.payload.token;
        setCookie('Authentication', token);
        
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
export const { logout } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
