import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem } from '@mui/material';
import {useState, useEffect} from 'react';
import WeightInput from '../components/WeightInput';
//currently using 2003 penn state, need to add modified

function PennState(){
    const [gender,setGender] = useState('');
    const [weight,setWeight] = useState("");
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [heightFeet,setHeightFeet] = useState(0);
    const [heightInches,setHeightInches] = useState(0);
    const [age,setAge] = useState(0);
    const [activityFactor,setActivityFactor] = useState(1);
    const [penn,setPenn] = useState('');
    const [tMax,setTmax] = useState(0);
    const [tMaxUnit,setTMaxUnit] = useState('Celsius');
    const [ve,setVe] = useState(0);

    useEffect(()=>{
        let mifflinOutput=0;
        let pennOutput='';
        const heightInCm = ((heightFeet*12) + heightInches)*2.54;
        const weightInKg = weightUnit==='Lbs' ? Number(weight)/2.205 : weight;
        console.log(weightInKg);
        if(!gender){
            setPenn('Select Gender');
            return;
        }
        if(gender==='male'){
            mifflinOutput =Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*age) + 5)*activityFactor);
        }
        else if(gender==='female'){
            mifflinOutput = Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*age) + - 161)*activityFactor);
        }
        let convertedTMax = tMax;
        if(tMaxUnit==='Fahrenheit'){
            convertedTMax=(convertedTMax-32)*(5/9);
        }
        pennOutput = String(Math.round(mifflinOutput*0.96 + convertedTMax*167 + ve*31 - 6212));
        setPenn(pennOutput + ' kcal');
    },[gender,weight,weightUnit,heightFeet,heightInches,age,activityFactor,tMax,tMaxUnit,ve])

    const handleTmaxUnit = (event:any) => {
        setTMaxUnit(event.target.value);
    }
    const handleTmax = (event:any) => {
        if(event.target.value<0){
            setTmax(0);
        }
        else if(event.target.value>120){
            setTmax(120);
        }
        else setTmax(event.target.value);
    }
    const handleVe = (event:any) =>{
        if(event.target.value<0){
            setVe(0);
        }
        else if(event.target.value>100){
            setVe(100);
        }
        else setVe(event.target.value);
    }
    const handleActivityFactor = (event:any) => {
        if(event.target.value>2){
            setActivityFactor(2);
        }
        else if(event.target.value<1){
            setActivityFactor(1)
        }
        else setActivityFactor(event.target.value);
    }
   const handleGender = (event:any) => {
       setGender(event.target.value);
   }
   const handleFeet = (event:any) => {
        if(event.target.value<0){
            setHeightFeet(0);
        }
        else if(event.target.value>8){
            setHeightFeet(8);
        }
        else setHeightFeet(event.target.value);
    }
    const handleInches = (event:any) => {
        if(event.target.value<0){
            setHeightInches(0);
        }
        else if(event.target.value>11){
            setHeightInches(11);
        }
        else setHeightInches(Number(event.target.value));
    }
    const handleAge = (event:any) =>{
        if(event.target.value<0){
            setAge(0);
        }
        else if(event.target.value>123){
            setAge(123);
        }
        else setAge(event.target.value);
    }
    return(
        <div className="pennState">
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                id="gender-select"
                value={gender}
                onChange={handleGender}
                sx={{flexDirection:'row'}}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <div id="heightContainer">
                <Typography>Height</Typography>
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
            <WeightInput 
                weight={weight}
                setWeight={setWeight}
                weightUnit={weightUnit}
                setWeightUnit={setWeightUnit}
                variant="small"
                includeLabel={true}
            />
            <div className="ageContainer">
                <Typography>Age</Typography>
                <TextField
                    type='number'
                    label='Years'
                    size="small"
                    onChange={handleAge}
                    sx={{width:'100px'}}
                    value={age}
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
                    placeholder='1'
                ></TextField>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin: '10px'}}>
                <Typography>TMax</Typography>
                <TextField
                        type="number"
                        size='small'
                        onChange={handleTmax}
                        sx={{width:'100px',marginLeft:'10px', marginRight:'5px'}}
                        value={tMax}
                        label={tMaxUnit==='Fahrenheit' ? '°F' : '°C'}
                ></TextField>
                <Select
                        id="tMaxUnitInput"
                        value={tMaxUnit}
                        onChange={handleTmaxUnit}
                        size="small"
                        sx={{marginLeft:'5px'}}
                        data-testid='temperature-unit'
                    >
                        <MenuItem value={'Celsius'}>Celsius</MenuItem>
                        <MenuItem value={'Fahrenheit'}>Fahrenheit</MenuItem>
                </Select>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin: '10px'}}>
                <Typography>Minute Ventilation</Typography>
                <TextField
                        type="number"
                        size='small'
                        onChange={handleVe}
                        sx={{width:'120px',marginLeft:'10px', marginRight:'5px'}}
                        value={ve}
                        label='VE in L/min'
                ></TextField>
            </div>
            <Paper sx={{margin:'10px',padding:'10px'}}>
                <Typography variant="h6">{penn}</Typography>
            </Paper>
        </div>
    )
}

export default PennState;

