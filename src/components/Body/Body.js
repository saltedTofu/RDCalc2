import CalculatorContainer from './CalculatorContainer/CalculatorContainer.js';
import AddButton from './AddButton/AddButton';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Body.css';
import { adjustCalcCounter, addCalc, removeCalc } from '../../redux/calcs.js';
import { Button} from '@mui/material';


function Body(){
    
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    const dispatch = useDispatch();
    
    const addNewCalc = () => {
        dispatch(addCalc(<CalculatorContainer key={calcCounter} id={calcCounter} onClose={onClose}/>));
        dispatch(adjustCalcCounter(1));
    }

    const onClose = (index) => {
        dispatch(removeCalc(index));
    }

    return (
        <div>
            <AddButton 
                addNewCalc={addNewCalc}
            />
            <h1>{calcCounter}</h1>
            <button onClick = {()=> dispatch(adjustCalcCounter(7))}>click me</button>
            <div className="body">
                {calcsArray}
            </div>
        </div>
        
    )
}

export default Body;