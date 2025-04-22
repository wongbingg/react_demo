import { configureStore } from '@reduxjs/toolkit'
import writeReducer from './writeSlice'

export const store = configureStore({
    reducer: {
        write: writeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch