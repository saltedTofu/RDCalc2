import {createSlice} from '@reduxjs/toolkit';

export const calcsArraySlice = createSlice({
    name:"calcs",
    initialState: {
        calcsArray:[],
        calcCounter:0
    },
    reducers:{
        addCalc: (state,action) => {
            state.calcsArray = [...state.calcsArray,action.payload];
        },
        removeCalc: (state,action) => {
            state.calcsArray = state.calcsArray.filter((calc)=> calc.props.id !== action.payload)
        },
        adjustCalcCounter: (state,action) => {
            state.calcCounter += action.payload;
        }

    }
})

export const {addCalc,removeCalc,adjustCalcCounter} = calcsArraySlice.actions;

export default calcsArraySlice.reducer;