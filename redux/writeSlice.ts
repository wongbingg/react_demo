import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WriteState {
    value: string
}

const initialState: WriteState = {
    value: '',
}

export const writeSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {
        inputText: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export const { inputText } = writeSlice.actions
export default writeSlice.reducer