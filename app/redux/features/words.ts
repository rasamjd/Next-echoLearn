import axios from "axios";
import { createSlice, AsyncThunk, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IWord } from "@/app/entities/Word";

export interface IWordsState {
  loading: boolean,
  words: IWord[],
  error: String,
}

interface IProps {
  user: string | string[] | undefined,
}

interface IPayloadAction {
  message: IWord[],
  status: number
}

const initialState: IWordsState = {
  loading: false,
  words: [],
  error: "",
}

export const fetchWords = createAsyncThunk("word/fetchWords", async ({user}: IProps) => {
  return axios.post("/api/getWords", { username: user })
    .then((response) => response.data)
})

const wordsSlice = createSlice({
  name: "word",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWords.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchWords.fulfilled,
      (state, action: PayloadAction<IPayloadAction>) => {
        state.loading = false
        state.words = action.payload.message
        state.error = ''
      }
    )
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.loading = false
      state.words = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default wordsSlice.reducer;