import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    service: serviceReducer,
  },
});

export default store;
