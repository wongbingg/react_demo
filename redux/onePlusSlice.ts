import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OnePlusState {
    value: number
}

const initialState: OnePlusState = {
    value: 0,
}

export const onePlusSlice = createSlice({
    name: 'onePlus',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        helloworld: state => {
            state.value += 100
        }
    },
})

export const { increment } = onePlusSlice.actions // 외부에서 사용 시, increment, incrementByAmount 라는 이름으로 가져가야됨.
export default onePlusSlice.reducer // 외부에서 사용 시, 자유롭게 이름을 붙일 수 있음.