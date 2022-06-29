import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem } from '@mui/material';
import {useState, useEffect} from 'react';
function Mifflin(){
    const [gender,setGender] = useState('');
    const [weight,setWeight] = useState(null);
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [heightFeet,setHeightFeet] = useState(null);
    const [heightInches,setHeightInches] = useState(null);
    const [age,setAge] = useState(null);
    const [output,setOutput] = useState('');
    const [activityFactor,setActivityFactor] = useState(1);

    useEffect(()=>{
        let mifflinOutput='';
        const heightInCm = ((heightFeet*12) + heightInches)*2.54;
        const weightInKg = weightUnit==='Lbs' ? weight/2.205 : weight;
        console.log(weightInKg);
        if(!gender){
            setOutput('Select Gender');
            return;
        }
        if(gender==='male'){
            mifflinOutput = (10*weightInKg) + (6.25*heightInCm) - (5*age) + 5;
        }
        else if(gender==='female'){
            mifflinOutput = (10*weightInKg) + (6.25*heightInCm) - (5*age) + - 161;
        }
        mifflinOutput *= activityFactor;
        setOutput(Math.floor(mifflinOutput) + ' kcal');
    },[gender,weight,weightUnit,heightFeet,heightInches,age,activityFactor])

    const handleActivityFactor = (event) => {
        if(event.target.value>2){
            setActivityFactor(2);
        }
        else if(event.target.value<1){
            setActivityFactor(1)
        }
        else setActivityFactor(event.target.value);
    }
   const handleGender = (event) => {
       setGender(event.target.value);
   }
   const handleFeet = (event) => {
        if(event.target.value<0){
            setHeightFeet(0);
        }
        else if(event.target.value>8){
            setHeightFeet(8);
        }
        else setHeightFeet(Number(event.target.value));
    }
    const handleInches = (event) => {
        if(event.target.value<0){
            setHeightInches(0);
        }
        else if(event.target.value>11){
            setHeightInches(11);
        }
        else setHeightInches(Number(event.target.value));
    }
    const handleWeightUnit = (event) => {
        setWeightUnit(event.target.value);
    }
    const handleWeight = (event) => {
        if(event.target.value<0){
            setWeight(0);
        }
        else if(event.target.value>9999){
            setWeight(9999)
        }
        else setWeight(Number(event.target.value));
    }
    const handleAge = (event) =>{
        if(event.target.value<0){
            setAge(0);
        }
        else if(event.target.value>123){
            setAge(123);
        }
        else setAge(Number(event.target.value));
    }
    return(
        <div className="mifflin">
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
            <div className="ageContainer">
                <Typography>Age</Typography>
                <TextField
                    type='number'
                    size="small"
                    onChange={handleAge}
                    sx={{width:'100px'}}
                    value={age}
                    label="Years"
                >
                </TextField>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin: '10px'}}>
                <Typography>Activity Factor</Typography>
                <TextField
                    type="number"
                    size='small'
                    onChange={handleActivityFactor}
                    sx={{width:'100px', marginLeft:'10px'}}
                    value={activityFactor}
                ></TextField>
            </div>
            <Paper sx={{margin:'10px',padding:'10px'}}>
                <Typography variant="h6">{output}</Typography>
            </Paper>
        </div>
    )
}

export default Mifflin;