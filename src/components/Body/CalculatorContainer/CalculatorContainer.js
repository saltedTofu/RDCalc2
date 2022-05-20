import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useState} from 'react';
import CalculatorComponent from './Calculator/Calculator';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { SvgIcon, IconButton, Paper} from '@mui/material';
import './Calculator/Calculator.js';
import './CalculatorContainer.css';

const CalculatorContainer = (({id, onClose}) => {
    const [chosenCalc, setChosenCalc] = useState('');

    const handleChange = (event) =>{
        setChosenCalc(event.target.value);
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