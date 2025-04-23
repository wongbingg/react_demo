import { configureStore } from '@reduxjs/toolkit'
import writeReducer from './writeSlice'
import homeReducer from './homeSlice'

export const store = configureStore({
    reducer: {
        write: writeReducer,
        home: homeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch