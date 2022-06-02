import {createSlice} from '@reduxjs/toolkit';

export const calcsArraySlice = createSlice({
    name:"calcs",
    initialState: {
        calcsArray:[],
        calcCounter:0,
        globalUser:''
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
        },
        setGlobalUser: (state,action) => {
            state.globalUser = action.payload;
        }

    }
})

export const {addCalc,removeCalc,adjustCalcCounter, setGlobalUser} = calcsArraySlice.actions;

export default calcsArraySlice.reducer;