import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import {useState, useEffect} from 'react';
import WeightInput from '../components/WeightInput';
import HeightInput from '../components/HeightInput';
import { decimalInputValidation } from '../../../../../../utils/decimalInputValidation';
import { wholeNumberInputValidation } from '../../../../../../utils/wholeNumberInputValidation';
import Spacer from '../../../../../Design/Spacer';
//currently using 2003 penn state, need to add modified

function PennState(){
    const [gender,setGender] = useState('');
    const [weight,setWeight] = useState("");
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [heightFeet,setHeightFeet] = useState("");
    const [heightInches,setHeightInches] = useState("");
    const [age,setAge] = useState("");
    const [activityFactor,setActivityFactor] = useState("1.2");
    const [penn,setPenn] = useState("");
    const [tMax,setTmax] = useState("");
    const [tMaxUnit,setTMaxUnit] = useState('Celsius');
    const [ve,setVe] = useState("");

    useEffect(()=>{
        let mifflinOutput=0;
        let pennOutput='';
        const heightInCm = ((Number(heightFeet)*12) + Number(heightInches))*2.54;
        const weightInKg = weightUnit==='Lbs' ? Number(weight)/2.205 : weight;
        if(!gender){
            setPenn('Select Gender');
            return;
        }
        if(gender==='male'){
            mifflinOutput =Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + 5)*Number(activityFactor));
        }
        else if(gender==='female'){
            mifflinOutput = Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + - 161)*Number(activityFactor));
        }
        let convertedTMax = Number(tMax);
        if(tMaxUnit==='Fahrenheit'){
            convertedTMax=(convertedTMax-32)*(5/9);
        }
        pennOutput = String(Math.round(mifflinOutput*0.96 + convertedTMax*167 + Number(ve)*31 - 6212));
        setPenn(pennOutput + ' kcal');
    },[gender,weight,weightUnit,heightFeet,heightInches,age,activityFactor,tMax,tMaxUnit,ve])

    const handleTmaxUnit = (event:SelectChangeEvent) => {
        setTMaxUnit(event.target.value);
    }
    const handleTmax = (event:React.ChangeEvent<HTMLInputElement>) => {
        const validatedString = decimalInputValidation(event.target.value, 5, 199)
        setTmax(validatedString);
    }
    const handleVe = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const validatedString = decimalInputValidation(event.target.value, 5, 99)
        setVe(validatedString);
    }
    const handleActivityFactor = (event:React.ChangeEvent<HTMLInputElement>) => {
        const validatedString = decimalInputValidation(event.target.value, 3, 3)
        setActivityFactor(validatedString);
    }
   const handleGender = (event:SelectChangeEvent) => {
       setGender(event.target.value);
   }
    const handleAge = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const validatedString = wholeNumberInputValidation(event.target.value, 3, 130)
        setAge(validatedString);
    }
    return(
        <div
            style={{
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width:'100%',
            }}
        >            
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
            <Spacer mt={8} style={{width:'85%'}}>
                <HeightInput 
                    feet={heightFeet}
                    inches={heightInches}
                    setFeet={setHeightFeet}
                    setInches={setHeightInches}
                    includeLabel={true}
                />
            </Spacer>
            <Spacer mt={16} style={{width:'85%'}}>        
                <WeightInput 
                    weight={weight}
                    setWeight={setWeight}
                    weightUnit={weightUnit}
                    setWeightUnit={setWeightUnit}
                    variant="small"
                    includeLabel={true}
                />
            </Spacer>            
            <Spacer
                mt={16}
                style={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width:'60%',
                }}
            >
                <Typography>Age</Typography>
                <TextField
                    autoComplete='off'
                    type='number'
                    label='Years'
                    size="small"
                    onChange={handleAge}
                    sx={{width:'100px'}}
                    value={age}
                >
                </TextField>
            </Spacer>
            <Spacer mt={16} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Typography>Activity Factor</Typography>
                <Spacer ml={8}>
                    <TextField
                        autoComplete='off'
                        type="string"
                        size='small'
                        onChange={handleActivityFactor}
                        sx={{width:'100px'}}
                        value={activityFactor}
                        placeholder='1'
                    ></TextField>
                </Spacer>
            </Spacer>
            <Spacer mt={16} style={{display:'flex', alignItems:'center', justifyContent:'space-around', width:'80%'}}>
                <Typography>TMax</Typography>
                <TextField
                        autoComplete='off'
                        type="string"
                        size='small'
                        onChange={handleTmax}                        
                        value={tMax}
                        label={tMaxUnit==='Fahrenheit' ? '°F' : '°C'}
                        sx={{width:'100px'}}
                ></TextField>
                <Select
                        id="tMaxUnitInput"
                        value={tMaxUnit}
                        onChange={handleTmaxUnit}
                        size="small"                      
                        data-testid='temperature-unit'
                    >
                        <MenuItem value={'Celsius'}>Celsius</MenuItem>
                        <MenuItem value={'Fahrenheit'}>Fahrenheit</MenuItem>
                </Select>
            </Spacer>
            <Spacer mt={16} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Typography>Minute Ventilation</Typography>
                <TextField
                        autoComplete='off'
                        type="string"
                        size='small'
                        onChange={handleVe}
                        sx={{width:'120px',marginLeft:'10px', marginRight:'5px'}}
                        value={ve}
                        label='VE in L/min'
                ></TextField>
            </Spacer>
            <Spacer mt={16} mb={16}>
                <Paper sx={{padding:'10px'}}>
                    <Typography variant="h6">{penn}</Typography>
                </Paper>
            </Spacer>
        </div>
    )
}

export default PennState;

