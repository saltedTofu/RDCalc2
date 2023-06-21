import {useState, useEffect} from 'react';
import { Slider, Typography, Paper } from '@mui/material';
import WeightInput from '../components/WeightInput';
import Spacer from '../../../../../Design/Spacer';

function Hamwi(){
	const [weight,setWeight] = useState('');
	const [weightUnit,setWeightUnit] = useState('Lbs');
	const [lowerCal,setLowerCal] = useState(25);
	const [higherCal,setHigherCal] = useState(30);
	const [lowerProtein, setLowerProtein] = useState(1.0);
	const [higherProtein, setHigherProtein] = useState(1.2);
	const [kcalRange,setKcalRange] = useState('');
	const [proteinRange,setProteinRange] = useState('');

	//Calorie Range Calculator
	useEffect(()=>{
		let weightToUse=Number(weight);
		if(weightUnit==='Lbs'){//convert to Kg
			weightToUse=weightToUse/2.2;
		}
		const lowerKcal = Math.round(lowerCal*weightToUse);
		const higherKcal = Math.round(higherCal*weightToUse);
		setKcalRange(`${lowerKcal} - ${higherKcal}`);
	},[lowerCal,higherCal,weight,weightUnit]);

	//Protein Range Calculator
	useEffect(()=>{
		let weightToUse=Number(weight);
		if(weightUnit==='Lbs'){
			weightToUse=weightToUse/2.2;
		}
		const lowerPro = Math.round(lowerProtein*weightToUse);
		const higherPro = Math.round(higherProtein*weightToUse);
		setProteinRange(`${lowerPro} - ${higherPro}`);
	},[lowerProtein,higherProtein,weight,weightUnit]);

	//Event Handlers for changing inputs and updating State
	const handleLowerCal = (event:any) => {
		setLowerCal(Number(event.target.value));
	};
	const handleHigherCal = (event:any) => {
		setHigherCal(Number(event.target.value));
	};
	const handleLowerProtein = (event:any) => {
		setLowerProtein(Number(event.target.value));
	};
	const handleHigherProtein = (event:any) => {
		setHigherProtein(Number(event.target.value));
	};

	return(
		<div 
			style={{
				display:'flex',
				flexDirection:'column',
				justifyContent:'center',
				alignItems:'center',
				width:'100%',
			}}
		>
			<Spacer mt={4}>
				<WeightInput 
					weight={weight}
					setWeight={setWeight}
					weightUnit={weightUnit}
					setWeightUnit={setWeightUnit}
				/>
			</Spacer>
			<Spacer mt={4}>
				<Typography variant="h5">Kcal Range</Typography>
			</Spacer>
			<Spacer mt={4}>
				<Slider 
					aria-label="Lower Kcal Range"
					defaultValue={lowerCal}
					value={lowerCal} 
					onChange={handleLowerCal}
					min={10}
					max={50}
					valueLabelDisplay="auto"
					sx={{width:'300px'}}
				>
				</Slider>
			</Spacer>                       
			<Typography>{lowerCal} kcal/kg</Typography>
			<Spacer mt={4}>
				<Slider 
					aria-label="Higher Kcal Range"
					defaultValue={higherCal}
					value={higherCal}
					onChange={handleHigherCal}
					min={10}
					max={50}
					valueLabelDisplay="auto"
					sx={{width:'300px'}}
				>
				</Slider>
			</Spacer>
			<Typography>{higherCal} kcal/kg</Typography>
			<Spacer mt={4}>
				<Paper sx={{padding:'10px'}}>
					<Typography  variant="h6">{kcalRange} kcal</Typography>
				</Paper>
			</Spacer>
			<Spacer mt={4}>
				<Typography variant="h5">Protein Range</Typography>
			</Spacer>
			<Spacer mt={4}>                      
				<Slider
					aria-label="Lower Protein Range"
					defaultValue={lowerProtein}
					value={lowerProtein}
					onChange={handleLowerProtein}
					min={0.1}
					max={4.0}
					step={0.1}
					sx={{width:'300px'}}
				></Slider>
			</Spacer>
			<Typography>{lowerProtein}</Typography>          
			<Slider
				aria-label="Higher Protein Range"
				defaultValue={higherProtein}
				value={higherProtein}
				onChange={handleHigherProtein}
				min={0.1}
				max={4.0}
				step={0.1}
				sx={{width:'300px'}}
			></Slider>
			<Typography>{higherProtein}</Typography>
			<Spacer mt={8} mb={8}>
				<Paper sx={{padding:'10px'}}>
					<Typography variant="h6">{proteinRange} g</Typography>
				</Paper>
			</Spacer>
		</div>
	);
}

export default Hamwi;