import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useState} from 'react';
import CalculatorComponent from './Calculator/Calculator';
import Draggable from 'react-draggable';
import './Calculator/Calculator.js';
import './CalculatorContainer.css';

function CalculatorContainer(){

    const [chosenCalc, setChosenCalc] = useState('');

    const handleChange = (event) =>{
        setChosenCalc(event.target.value);
    }

    return(
        <Draggable
            handle=".handle"
        >
            <div className="CalculatorContainer">
                <div className="handle">
                </div>
                <div className="selectCalc">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Add Calculator</InputLabel>
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
                </div>
                <CalculatorComponent 
                    Calc={chosenCalc}
                />
            </div>
        </Draggable>
    )
}

export default CalculatorContainer;