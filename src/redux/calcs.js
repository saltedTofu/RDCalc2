import {createSlice} from "@reduxjs/toolkit";
import CalculatorContainer from "features/Body/components/CalculatorContainer";

export const calcsArraySlice = createSlice({
	name:"calcs",
	initialState: {
		calcsArray:[],
		calcNamesArray:[],
		calcCounter:0,
		globalUser:""
	},
	reducers:{
		addCalc: (state,action) => {
			state.calcsArray = [...state.calcsArray,action.payload];
		},
		removeCalc: (state,action) => {
			state.calcsArray = state.calcsArray.filter((calc)=> calc.props.id !== action.payload);
		},
		adjustCalcCounter: (state,action) => {
			state.calcCounter += action.payload;
		},
		setGlobalUser: (state,action) => {
			state.globalUser = action.payload;
		},
		addCalcName:(state,action)=>{
			state.calcNamesArray = [...state.calcNamesArray,action.payload];
		},
		removeCalcName:(state,action)=>{
			const index = state.calcNamesArray.indexOf(action.payload);
			let refArray = state.calcNamesArray;
			refArray.splice(index,1);
			state.calcNamesArray = refArray;
		},
		setCalcsArray:(state,action)=>{
			state.calcNamesArray = action.payload;
			state.calcCounter += state.calcNamesArray.length;
			state.calcsArray = state.calcNamesArray.map((calcName, index)=><div key={index} data-grid={{ x: 0, y: 0, w: 4, h: 3, minW:4, maxW:4, minH:3}} id={index}>{<CalculatorContainer name={calcName} key={index} id={index}/>}</div>);
		}

	}
});

export const {addCalc,removeCalc,adjustCalcCounter, setGlobalUser, addCalcName,removeCalcName, setCalcsArray} = calcsArraySlice.actions;

export default calcsArraySlice.reducer;