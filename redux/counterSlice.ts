import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { increment, incrementByAmount } = counterSlice.actions // 외부에서 사용 시, increment, incrementByAmount 라는 이름으로 가져가야됨.
export default counterSlice.reducer // 외부에서 사용 시, 자유롭게 이름을 붙일 수 있음.