import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Memo } from '../types/memo'

interface HomeState {
    memos: Memo[]
}

const initialState: HomeState = {
    memos: [],
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setMemos(state, action) {
            state.memos = action.payload
        }
    }
})

export const { setMemos } = homeSlice.actions
export default homeSlice.reducer