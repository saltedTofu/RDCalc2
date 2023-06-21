import { Paper, Typography, RadioGroup, FormControlLabel, Radio, TextField} from '@mui/material';
import {useState, useEffect} from 'react';
import WeightInput from '../components/WeightInput';
import HeightInput from '../components/HeightInput';
import { decimalInputValidation } from '../../../../../../utils/decimalInputValidation';
import { wholeNumberInputValidation } from '../../../../../../utils/wholeNumberInputValidation';
import Spacer from '../../../../../Design/Spacer';
import FormulaPopover from '../components/FormulaPopover';

function Mifflin(){
	const [gender,setGender] = useState('');
	const [weight,setWeight] = useState('');
	const [weightUnit,setWeightUnit] = useState('Lbs');
	const [heightFeet,setHeightFeet] = useState('');
	const [heightInches,setHeightInches] = useState('');
	const [age,setAge] = useState('');
	const [output,setOutput] = useState('');
	const [activityFactor,setActivityFactor] = useState('1.2');

	useEffect(()=>{
		let mifflinOutput='';
		const heightInCm = ((Number(heightFeet)*12) + Number(heightInches))*2.54;
		const weightInKg = weightUnit==='Lbs' ? Number(weight)/2.205 : weight;
		if(!gender){
			setOutput('Select Gender');
			return;
		}
		if(gender==='male'){
			mifflinOutput = String(Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + 5)*Number(activityFactor)));
		}
		else if(gender==='female'){
			mifflinOutput = String(Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + - 161)*Number(activityFactor)));
		}
		setOutput(mifflinOutput + ' kcal');
	},[gender,weight,weightUnit,heightFeet,heightInches,age,activityFactor]);

	const handleActivityFactor = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = decimalInputValidation(event.target.value, 3, 3);
		setActivityFactor(validatedString);
	};
	const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGender(event.target.value);
	};
	const handleAge = (event:React.ChangeEvent<HTMLInputElement>) =>{
		const validatedString = wholeNumberInputValidation(event.target.value, 3, 130);
		setAge(validatedString);
	};
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
			<Spacer mt={8} style={{width:'100%'}}>
				<HeightInput 
					feet={heightFeet}
					inches={heightInches}
					setFeet={setHeightFeet}
					setInches={setHeightInches}
					includeLabel={true}
				/>
			</Spacer>
			<Spacer mt={16} style={{width:'100%'}}>
				<WeightInput 
					weight={weight}
					setWeight={setWeight}
					weightUnit={weightUnit}
					setWeightUnit={setWeightUnit}
					includeLabel={true}
					variant="small"
				/>
			</Spacer>
			<Spacer
				mt={16}
				style={{
					display:'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					width:'50%',
				}}
			>                
				<Typography>Age</Typography>
				<TextField
					autoComplete='off'
					type='string'
					size="small"
					onChange={handleAge}
					sx={{width:'100px'}}
					value={age}
					label="Years"
				>
				</TextField>
			</Spacer>
			<Spacer 
				mt={16} 
				style={{
					display:'flex', 
					alignItems:'center', 
					justifyContent:'center'
				}}
			>
				<Typography>Activity Factor</Typography>
				<Spacer ml={8}>
					<TextField
						type="string"
						size='small'
						onChange={handleActivityFactor}
						sx={{width:'100px'}}
						value={activityFactor}
						data-testid="activity-factor"
					></TextField>
				</Spacer>
			</Spacer>
			<Spacer mt={16}>
				<Paper sx={{padding:'10px'}}>
					<Typography variant="h6">{output}</Typography>
				</Paper>
			</Spacer>
			<Spacer mt={16} mb={16}>            
				<FormulaPopover>
					<div
						style={{
							display:'flex'
						}}
					>
						<Typography variant="body1" sx={{fontWeight:'bold', textDecoration:'underline', paddingRight:'4px'}}>Male: </Typography>
						<Typography variant="body1">(10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</Typography>
					</div>
					<Spacer
						mt={4}
						style={{
							display:'flex'
						}}
					>
						<Typography variant="body1" sx={{fontWeight:'bold', textDecoration:'underline', paddingRight:'4px'}}>Female: </Typography>
						<Typography variant="body1">(10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</Typography>
					</Spacer>
				</FormulaPopover>
			</Spacer>
            
		</div>
	);
}

export default Mifflin;