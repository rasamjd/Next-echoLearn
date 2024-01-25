import axios from "axios";
import { createSlice, AsyncThunk, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject } from "@/app/entities/Project";

export interface IPtojectsState {
  loading: boolean,
  projects: IProject[],
  error: String,
}

interface IProps {
  user: string | string[] | undefined,
}

interface IPayloadAction {
  message: IProject[],
  status: number
}

const initialState: IPtojectsState = {
  loading: false,
  projects: [],
  error: "",
}

export const fetchProjects = createAsyncThunk("project/fetchProjects", async ({ user }: IProps) => {
  return axios.post("/api/getProjects", { user: user })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
})

const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProjects.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<IPayloadAction>) => {
        state.loading = false
        state.projects = action.payload.message
        state.error = ''
      }
    )
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false
      state.projects = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default projectsSlice.reducer;