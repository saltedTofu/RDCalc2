import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {useState} from 'react';
import CalculatorComponent from './Calculator/Calculator';
import Draggable from 'react-draggable';
import CloseIcon from '@mui/icons-material/Close';
import { SvgIcon, IconButton, Typography, Paper } from '@mui/material';
import './Calculator/Calculator.js';
import './CalculatorContainer.css';

function CalculatorContainer({handleClose,id}){

    const [chosenCalc, setChosenCalc] = useState('');
    const [calcId,setCalcId] = useState(id);

    const handleChange = (event) =>{
        setChosenCalc(event.target.value);
    }
    const handleClick = () => {
        console.log('handling click');
        handleClose(calcId);
    }
    
    return(
        <Draggable
            handle=".handle"
            bounds="parent"
        >
            <div className="CalculatorContainer">
                <div className="handle">
                    <IconButton 
                        sx={{padding:"0"}} 
                        onClick={handleClick}
                    >
                        <SvgIcon component={CloseIcon} fontSize="small">
                        </SvgIcon>
                    </IconButton>
                </div>
                
                <Paper className="selectCalc">
                    <p>{id}</p>
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
            </div>
        </Draggable>
    )
}

export default CalculatorContainer;