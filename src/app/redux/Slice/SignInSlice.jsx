import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postSignIn = createAsyncThunk(
  "SignIn/postSignIn",
  async (data) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BACKEND + "/users/login",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.statusCode === 201) {
        toast.success("Sign In Success. Welcome " + response.data.data.name, {
          autoClose: 2000,
          toastId: "successSignIn",
        });
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("name", response.data.data.name);
      } else {
        toast.warning(response.data.message, {
          autoClose: 2000,
          toastId: "warningSignIn",
        });
      }

      return response.data;
    } catch (error) {
      toast.warning(error.response.data.message, {
        autoClose: 2000,
        toastId: "errorSignIn",
      });
    }
  }
);

const SignInSlice = createSlice({
  name: "SignIn",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    SignIn: [],
  },
  extraReducers: {
    [postSignIn.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postSignIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.SignIn = action.payload;
      state.status = "success";
      state.statusCode = action.payload.statusCode;
    },
    [postSignIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default SignInSlice.reducer;
