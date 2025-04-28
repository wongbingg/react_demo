import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WriteState {
    titleValue: string,
    bodyValue: string,
    refValue: string
}

const initialState: WriteState = {
    titleValue: '',
    bodyValue: '',
    refValue: ''
}

export const writeSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {
        setTitleValue: (state, action: PayloadAction<string>) => {
            state.titleValue = action.payload;
        },
        setBodyValue: (state, action: PayloadAction<string>) => {
            state.bodyValue = action.payload;
        },
        setRefValue: (state, action: PayloadAction<string>) => {
            state.refValue = action.payload;
        },
    }
})

export const { setTitleValue, setBodyValue, setRefValue } = writeSlice.actions
export default writeSlice.reducer