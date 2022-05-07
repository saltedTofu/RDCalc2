import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import {useState} from 'react';

function IdealBodyWeight(){

    const [gender,setGender] = useState('');
    const [heightFeet,setHeightFeet] = useState(0);
    const [heightInches,setHeightInches] = useState(0);
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [weight,setWeight] = useState(0);

    const handleGender = (event) => {
        setGender(event.target.value);
    }
    const handleFeet = (event) => {
        setHeightFeet(event.target.value);
    }
    const handleInches = (event) => {
        setHeightInches(event.target.value);
    }
    const handleWeightUnit = (event) => {
        setWeightUnit(event.target.value);
    }
    const handleWeight = (event) => {
        setWeight(event.target.value);
    }
    

    return(
        <div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={handleGender}
                    sx={{flexDirection:'row'}}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                <Typography>Height</Typography>
                <TextField 
                    required
                    label="Feet"
                    type="number"
                    size="small"
                    value={heightFeet}
                    onChange={handleFeet}
                >
                </TextField>
                <TextField
                    required
                    label="Inches"
                    type="number"
                    size="small"
                    value={heightInches}
                    onChange={handleInches}
                >
                </TextField>
                <Typography>Weight</Typography>
                <TextField
                    required
                    label={weightUnit}
                    type="number"
                    size="small"
                    value={weight}
                    onChange={handleWeight}
                >
                </TextField>
                <InputLabel id="weightUnitInput">Weight Unit</InputLabel>
                <Select
                    labelId="weightUnitInput"
                    value={weightUnit}
                    label="selectWeightUnit"
                    onChange={handleWeightUnit}
                >
                    <MenuItem >Lbs</MenuItem>
                    <MenuItem >Kg</MenuItem>
                </Select>

            </FormControl>
            
            
        </div>
    )
}
export default IdealBodyWeight;