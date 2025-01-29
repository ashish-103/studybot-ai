import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import authReducer from "../"

// Middleware to persist auth state to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  if (state.auth) {
    localStorage.setItem("user", JSON.stringify(state.auth.user));
    localStorage.setItem("token", state.auth.token);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
