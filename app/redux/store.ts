import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from "@/app/redux/features/words"
import projectsReducer from "@/app/redux/features/projects"
import authReducer from "@/app/redux/features/auth"

const store = configureStore({
  reducer: {
    word: wordsReducer,
    project: projectsReducer,
    auth: authReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch