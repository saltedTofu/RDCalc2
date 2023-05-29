import {Paper, Typography, Checkbox, FormGroup, Radio, RadioGroup, FormControlLabel, TextField, Select, MenuItem } from '@mui/material';
import {useState, useEffect} from 'react';
import '../../Calculator.css';

function IdealBodyWeight(){
    const [gender,setGender] = useState('');
    const [heightFeet,setHeightFeet] = useState('');
    const [heightInches,setHeightInches] = useState('');
    const [weightUnit,setWeightUnit] = useState('Lbs');
    const [weight,setWeight] = useState('');
    const [IBW, setIBW] = useState('');
    const [percentIBW,setPercentIBW] = useState('');
    const [LBKA, setLBKA] = useState(false);
    const [RBKA, setRBKA] = useState(false);
    const [LAKA, setLAKA] = useState(false);
    const [RAKA, setRAKA] = useState(false);
    const [paraplegic, setParaplegic] = useState(false);
    const [quadriplegic, setQuadriplegic] = useState(false);
    const [BMI,setBMI] = useState('');
    const [adjusted,setAdjusted] = useState(false);

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
        }

        
        let totalHeight = (Number(heightFeet)*12) + Number(heightInches);
        let weightModifier = 1;
        if(LBKA) weightModifier -= .06;
        if(RBKA) weightModifier -= .06;
        if(LAKA) weightModifier -= .16;
        if(RAKA) weightModifier -= .16;
        if(paraplegic) weightModifier -= .125; //range is 10%-15%
        if(quadriplegic) weightModifier -= .175; //range is 15%-20%

        
        //BMI Calculations
        let adjustedWeight=weight;
        if(weightModifier<1){ //adjusted weight for amputation/paralyzations
            adjustedWeight = adjustedWeight*(1+(1-weightModifier));
            setAdjusted(true);
        }
        else{
            setAdjusted(false);
        }
        if(weightUnit==='Lbs'){
            const convertedWeight=Number(adjustedWeight)/2.205;
            const convertedHeight=totalHeight*2.54/100;
            const calculatedBMI = Math.round(convertedWeight/(convertedHeight*convertedHeight)*10)/10; //round to 1 decimal place
            setBMI(calculatedBMI);
        }
        else{
            const convertedHeight=totalHeight*2.54/100;
            const calculatedBMI = Math.round(adjustedWeight/(convertedHeight*convertedHeight)*10)/10; //round to 1 decimal place
            console.log(calculatedBMI);
            setBMI(calculatedBMI);
        }

        if(totalHeight<60){
            let inchesBelowFiveFeet = 60-totalHeight; 
            if(gender==='male'){
                let IBWMale = Math.round((106-2*(inchesBelowFiveFeet))*weightModifier);
                setIBW(IBWMale + ' lbs or ' + Math.round(IBWMale/2.2) + ' kg');
                if(weightUnit==='Kg'){
                    setPercentIBW(Math.round((weight*2.2)/IBWMale*100) + '%');
                }
                else setPercentIBW(Math.round(weight/IBWMale*100) + '%');
            }
            else if(gender==='female'){
                let IBWFemale = Math.round((100-2*(inchesBelowFiveFeet))*weightModifier);
                setIBW(IBWFemale + 'lbs or ' + Math.round(IBWFemale/2.2) + ' kg');
                if(weightUnit==='Kg'){
                    setPercentIBW(Math.round((weight*2.2)/IBWFemale*100) + '%');
                }
                else setPercentIBW(Math.round(weight/IBWFemale*100) + '%');
            }
            return;
        }
        if(gender==='male'){
            let IBWMale = Math.round((106 + 6*(totalHeight-60))*weightModifier); //works if over 5 feet
            setIBW(IBWMale + ' lbs or ' + Math.round(IBWMale/2.2) + ' kg');
            if(weightUnit==='Kg'){
                setPercentIBW(Math.round((weight*2.2)/IBWMale*100) + '%');
            }
            else setPercentIBW(Math.round(weight/IBWMale*100) + '%');
            
        }
        else if(gender==='female'){
            let IBWFemale = Math.round((100 + 5*(totalHeight-60))*weightModifier); //works if over 5 feet
            setIBW(IBWFemale + ' lbs or ' + Math.round(IBWFemale/2.2) + ' kg');
            if(weightUnit==='Kg'){
                setPercentIBW(Math.round((weight*2.2)/IBWFemale*100) + '%');
            }
            else setPercentIBW(Math.round(weight/IBWFemale*100) + '%');
        }
    },[gender,heightFeet,heightInches,weight,weightUnit,LBKA,RBKA,LAKA,RAKA,paraplegic,quadriplegic])

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
        else setHeightFeet(event.target.value);
    }
    const handleInches = (event) => {
        if(event.target.value<0){
            setHeightInches(0);
        }
        else if(event.target.value>11){
            setHeightInches(11);
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
        else if(event.target.value>9999){
            setWeight(9999);
        }
        else setWeight(event.target.value);
    }
    const handleLBKA = (event) => {
        if(event.target.checked){
            setLBKA(true);
        }
        else setLBKA(false);
    }
    const handleRBKA = (event) => {
        if(event.target.checked){
            setRBKA(true);
        }
        else setRBKA(false);
    }
    const handleLAKA = (event) => {
        if(event.target.checked){
            setLAKA(true);
        }
        else setLAKA(false);
    }
    const handleRAKA = (event) => {
        if(event.target.checked){
            setRAKA(true);
        }
        else setRAKA(false);
    }
    const handleParaplegic = (event) => {
        if(event.target.checked){
            setParaplegic(true);
        }
        else setParaplegic(false);
    }
    const handleQuadriplegic = (event) => {
        if(event.target.checked){
            setQuadriplegic(true);
        }
        else setQuadriplegic(false);
    }
    return(
        <div id="ibwCalculator">
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                id="gender-select"
                labelid="gender-select"
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
                    placeholder="0"
                    type="number"
                    size="small"
                    value={weight}
                    onChange={handleWeight}
                    sx={{width:'100px'}}
                >
                </TextField>
                <Select
                    id="weightUnitInput"
                    value={weightUnit}
                    onChange={handleWeightUnit}
                    size="small"
                    data-testid="units-select"
                >
                    <MenuItem value={'Lbs'} data-testid="lbs-select">Lbs</MenuItem>
                    <MenuItem value={'Kg'} data-testid="kg-select">Kg</MenuItem>
                </Select>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'flex-start'}}>
                <div style={{marginRight:'5px'}}>
                    <Typography variant='p'>Amputations?</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleLBKA} size='small'/>} label="L BKA (6%)" />
                        <FormControlLabel control={<Checkbox onChange={handleRBKA} size='small'/>} label="R BKA (6%)" />
                        <FormControlLabel control={<Checkbox onChange={handleLAKA} size='small'/>} label="L AKA (16%)" />
                        <FormControlLabel control={<Checkbox onChange={handleRAKA} size='small'/>} label="R AKA (16%)" />
                    </FormGroup>
                </div>
                <div style={{marginLeft:'5px'}}>
                    <Typography variant='p'>Paralyzations?</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleParaplegic}size='small'/>} label="Paraplegic (12.5%)" />
                        <FormControlLabel control={<Checkbox onChange={handleQuadriplegic}size='small'/>} label="Quadriplegic (17.5%)" />
                    </FormGroup>
                </div>
            </div>
            <Paper sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'10px'}}>
                <Typography variant="h6">IBW={IBW}</Typography>
                <Typography variant="h6">%IBW={percentIBW}</Typography>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {adjusted && <Typography sx={{marginRight:'5px'}}>(adjusted)</Typography>}
                    <Typography variant="h6">BMI={BMI}</Typography>
                </div>
            </Paper>
        </div>
    )
}
export default IdealBodyWeight;