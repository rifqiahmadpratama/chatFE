import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postSignUpUser = createAsyncThunk(
  "SignUpUser/postSignUpUser",
  async (dataUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3200/users/register",
        JSON.stringify(dataUser),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.statusCode === 201) {
        toast.success("Sign Up Success. wait a few seconds", {
          autoClose: 2000,
          toastId: "successSignUp",
        });
      } else {
        toast.warning(response.data.message, {
          autoClose: 2000,
          toastId: "warningSignUp",
        });
      }

      return response.data;
    } catch (error) {
      toast.warning(error.response.data.message, {
        autoClose: 2000,
        toastId: "errorSignUp",
      });
    }
  }
);

const SignUpUserSlice = createSlice({
  name: "SignUpUser",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    SignUpUser: [],
  },
  extraReducers: {
    [postSignUpUser.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postSignUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.SignUpUser = action.payload;
      state.status = "success";
    },
    [postSignUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default SignUpUserSlice.reducer;
