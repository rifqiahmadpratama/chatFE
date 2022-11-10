import { configureStore } from "@reduxjs/toolkit";

import SignInReducer from "./Slice/SignInSlice";
import SignUpUserReducer from "./Slice/SignUpUserSlice";
import ProfileUserReducer from "./Slice/ProfileSlice";

export default configureStore({
  reducer: {
    SignIn: SignInReducer,
    SignUpUser: SignUpUserReducer,
    ProfileUser: ProfileUserReducer,
  },
});
