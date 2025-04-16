import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import onePlusReducer from './onePlusSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        onePlus: onePlusReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch