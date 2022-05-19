import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import {useState, useEffect} from 'react';
import '../Calculator.css';

function IdealBodyWeight(){
    const [gender,setGender] = useState('');
    const [heightFeet,setHeightFeet] = useState(0);
    const [heightInches,setHeightInches] = useState(0);
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [weight,setWeight] = useState(0);
    const [IBW, setIBW] = useState('');
    const [percentIBW,setPercentIBW] = useState('');

    useEffect(()=>{
        if(!gender){
            setIBW('Please Select Gender');
            return;
        }
        else if(!heightFeet){
            setIBW('Please Enter Height');
            setPercentIBW('Please Enter Height');
            return;
        }
        else if(!weight){
            setPercentIBW('Please Enter Weight');
            //maybe highlight the field?
        }

        let totalHeight = (Number(heightFeet)*12) + Number(heightInches);

        if(totalHeight<60){
            let inchesBelowFiveFeet = 60-totalHeight;
            if(gender==='male'){
                let IBWMale = 106-2*(inchesBelowFiveFeet);
                setIBW(IBWMale + ' lbs or ' + Math.round(IBWMale/2.2) + ' kg');
                if(weightUnit==='Kg'){
                    setPercentIBW(Math.round((weight*2.2)/IBWMale*100) + '%');
                }
                else setPercentIBW(Math.round(weight/IBWMale*100) + '%');
            }
            else if(gender==='female'){
                let IBWFemale = 100-2*(inchesBelowFiveFeet);
                setIBW(IBWFemale + 'lbs or ' + Math.round(IBWFemale/2.2) + ' kg');
                if(weightUnit==='Kg'){
                    setPercentIBW(Math.round((weight*2.2)/IBWFemale*100) + '%');
                }
                else setPercentIBW(Math.round(weight/IBWFemale*100) + '%');
            }
            return;
        }
        if(gender==='male'){
            let IBWMale = 106 + 6*(totalHeight-60); //works if over 5 feet
            setIBW(IBWMale + ' lbs or ' + Math.round(IBWMale/2.2) + ' kg');
            if(weightUnit==='Kg'){
                setPercentIBW(Math.round((weight*2.2)/IBWMale*100) + '%');
            }
            else setPercentIBW(Math.round(weight/IBWMale*100) + '%');
            
        }
        else if(gender==='female'){
            let IBWFemale = 100 + 5*(totalHeight-60); //works if over 5 feet
            setIBW(IBWFemale + ' lbs or ' + Math.round(IBWFemale/2.2) + ' kg');
            if(weightUnit==='Kg'){
                setPercentIBW(Math.round((weight*2.2)/IBWFemale*100) + '%');
            }
            else setPercentIBW(Math.round(weight/IBWFemale*100) + '%');
        }
    })
    const handleGender = (event) => {
        setGender(event.target.value);
    }
    const handleFeet = (event) => {
        if(event.target.value<0){
            setHeightFeet(0);
        }
        else setHeightFeet(event.target.value);
    }
    const handleInches = (event) => {
        if(event.target.value<0){
            setHeightInches(0);
        }
        else setHeightInches(event.target.value);
    }
    const handleWeightUnit = (event) => {
        setWeightUnit(event.target.value);
    }
    const handleWeight = (event) => {
        if(event.target.value<0){
            setWeight(0);
        }
        else setWeight(event.target.value);
    }
    return(
        <div id="ibwCalculator">
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                id="gender-select"
                labelId="gender-select"
                value={gender}
                onChange={handleGender}
                sx={{flexDirection:'row'}}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <div id="heightContainer">
                <Typography variant="p">Height</Typography>
                <TextField 
                    label="Feet"
                    type="number"
                    size="small"
                    value={heightFeet}
                    onChange={handleFeet}
                    sx={{width:'100px'}}
                >
                </TextField>
                <TextField
                    label="Inches"
                    type="number"
                    size="small"
                    value={heightInches}
                    onChange={handleInches}
                    sx={{width:'100px'}}
                >
                </TextField>
            </div>
            <div className="weightContainer">
                <Typography variant="p">Current Weight</Typography>
                <TextField
                    label={weightUnit}
                    type="number"
                    size="small"
                    value={weight}
                    onChange={handleWeight}
                    sx={{width:'100px'}}
                >
                </TextField>
                <Select
                    labelId="weightUnitInputLabel"
                    id="weightUnitInput"
                    value={weightUnit}
                    label="Weight Unit"
                    onChange={handleWeightUnit}
                    size="small"
                >
                    <MenuItem value={'Lbs'}>Lbs</MenuItem>
                    <MenuItem value={'Kg'}>Kg</MenuItem>
                </Select>
            </div>
            <Typography variant="h6">IBW={IBW}</Typography>
            <Typography variant="h6">%IBW={percentIBW}</Typography> 
        </div>
    )
}
export default IdealBodyWeight;