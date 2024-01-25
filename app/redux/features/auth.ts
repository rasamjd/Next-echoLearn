import axios from "axios";
import { createSlice, AsyncThunk, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";

export interface IAuthState {
  loading: boolean,
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  loading: true,
  isAuthenticated: false
}

export const checkAuth = createAsyncThunk("project/checkAuth", async (state: String) => {
  return state === "authenticated"
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkAuth.pending, state => {
      state.loading = true
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
      }
    )
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false
      state.isAuthenticated = false
    })
  }
})

export default authSlice.reducer;