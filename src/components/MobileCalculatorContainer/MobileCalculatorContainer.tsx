import {Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import CalculatorComponent from '../Body/CalculatorContainer/CalculatorComponent/CalculatorComponent'
import {useState} from 'react';
import Spacer from '../Design/Spacer';

function MobileCalculatorContainer(){

    const [chosenCalc, setChosenCalc] = useState('');

    const handleChange = (event:SelectChangeEvent) =>{
        setChosenCalc(event.target.value);
    }

    return(
            <div
                style={{
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop:'5%',
                    width:'100%',
                    minHeight: '100vh',
                }}
            >
                <Paper className="selectCalc">
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
                <Spacer mt={8} style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <CalculatorComponent 
                        Calc={chosenCalc}
                    />
                </Spacer>
            </div>
    )
   
}
export default MobileCalculatorContainer;