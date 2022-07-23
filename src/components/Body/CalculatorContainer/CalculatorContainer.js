import {useState,useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import CalculatorComponent from './CalculatorComponent/CalculatorComponent';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { SvgIcon, IconButton, Paper, Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import {removeCalc, removeCalcName, addCalcName, adjustCalcCounter} from '../../../redux/calcs';
import './CalculatorComponent/CalculatorComponent.js';
import './CalculatorContainer.css';

const CalculatorContainer = (({id, name=''}) => {
    const dispatch = useDispatch();
    const [chosenCalc, setChosenCalc] = useState('');
    const calcNamesArray = useSelector(state => state.calcsArray.calcNamesArray);
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);

    useEffect(()=>{ //sets the calcNamesArray if rendered through selecting a layout (name has been passed as a prop)
        if(name){
            setChosenCalc(name);
            dispatch(adjustCalcCounter(1));
        }
    },[])

    useEffect(()=>{
        setChosenCalc(name);
    },[name])

    const onClose = (index) => {
        dispatch(removeCalcName(chosenCalc))
        dispatch(removeCalc(index));
    }

    const handleChange = (event) =>{
        if(chosenCalc){
            dispatch(removeCalcName(chosenCalc));
        }
        setChosenCalc(event.target.value);
        dispatch(addCalcName(event.target.value));
    }

    const handleClose = () => {
        onClose(id);
    }
    
    return(
            <Paper className="CalculatorContainer" elevation={5}>
                <Paper className="handle" sx={{marginBottom:'7px'}}>
                    <IconButton 
                        sx={{padding:"0"}} 
                        onClick={handleClose}
                    >
                        <SvgIcon component={CloseIcon} fontSize="small">
                        </SvgIcon>
                    </IconButton>
                </Paper>
                <Paper className="selectCalc" sx={{marginBottom:'7px'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pick Calculator</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chosenCalc}
                            label="AddCalculator"
                            onChange={handleChange}
                        >
                            <MenuItem value={'IBW'}>Ideal Body Weight</MenuItem>
                            <MenuItem value={'TubeFeeding'}>Tube Feeding</MenuItem>
                            <MenuItem value={'TPN/PPN'}>TPN/PPN</MenuItem>
                            <MenuItem value={'Notes'}>Notepad</MenuItem>
                            <MenuItem value={'lbs/kg'}>Lbs/Kg Converter</MenuItem>
                            <MenuItem value={'Hamwi'}>Hamwi</MenuItem>
                            <MenuItem value={'PennState'}>Penn State</MenuItem>
                            <MenuItem value={'Mifflin'}>Mifflin</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
                <CalculatorComponent 
                    Calc={chosenCalc}
                />
            </Paper>
    )
})

export default CalculatorContainer;