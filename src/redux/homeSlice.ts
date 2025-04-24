import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteMemoById, fetchMemoById, fetchMemos } from '../persistance/sqliteStorage'

interface HomeState {
    memos: { id: string, text: string }[]
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