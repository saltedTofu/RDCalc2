import './MobileCalculatorContainer.css';
import {Paper, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import CalculatorComponent from '../Body/CalculatorContainer/CalculatorComponent/CalculatorComponent'
import {useState} from 'react';

function MobileCalculatorContainer(){

    const [chosenCalc, setChosenCalc] = useState('');

    const handleChange = (event:any) =>{
        setChosenCalc(event.target.value);
    }

    return(
            <div className="mobileCalculatorContainer">
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
                            <MenuItem value={'InchesCm'}>Inches/Cm Converter</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
                <CalculatorComponent 
                    Calc={chosenCalc}
                />
            </div>
    )
   
}
export default MobileCalculatorContainer;