import {TextField, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Paper} from "@mui/material";
import Spacer from "components/Spacer";
import Text from "components/Text";
import WeightInput from "components/WeightInput";
import {useState, useEffect} from "react";
import FormulaPopover from "components/FormulaPopover";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";

export default function IretonJones(){

	const [age, setAge] = useState("");
	const [weight, setWeight] = useState("");
	const [weightUnit, setWeightUnit] = useState("Lbs");
	const [gender, setGender] = useState("");
	const [burn, setBurn] = useState(false);
	const [trauma, setTrauma] = useState(false);
	const [vent, setVent] = useState(false);
	const [obese, setObese] = useState(false);
	const [output, setOutput] = useState("");

	useEffect(() => {
		const weightInKg = weightUnit === "Kg" ? Number(weight) : Number(weight)/2.2;
		let kcal=0;
		if(vent){
			kcal = 1784 - 11 * (Number(age)) + 5 * (weightInKg) + 244 * (gender==="Male" ? 1 : 0) + 239 * (trauma ? 1 : 0) + 804 * (burn ? 1 : 0);
			console.log(gender);
		}
		else{
			kcal = 629 - 11 * (Number(age)) + 25 * (weightInKg) - 609 * (obese ? 1 : 0);
		}
		setOutput(String(Math.round(kcal)) + " kcal");

	},[age, weight, weightUnit, gender, burn, trauma, vent, obese]);

	const handleAge = (event:React.ChangeEvent<HTMLInputElement>) =>{
		const validatedString = wholeNumberInputValidation(event.target.value, 3, 130);
		setAge(validatedString);
	};

	const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGender(event.target.value);
	};

	const handleBurn = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setBurn(true);
		}
		else setBurn(false);
	};

	const handleTrauma = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setTrauma(true);
		}
		else setTrauma(false);
	};

	const handleVent = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setVent(true);
		}
		else setVent(false);
	};

	const handleObese = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setObese(true);
		}
		else setObese(false);
	};

	return(
		<div
			style={{
				width:"100%",
				display:"flex",
				flexDirection:"column",
				justifyContent:"center",
				alignItems:"center"
			}}
		>
			<Spacer mt={8}>
				<RadioGroup
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
					id="gender-select"
					value={gender}
					onChange={handleGender}
					sx={{flexDirection:"row"}}
				>
					<FormControlLabel value="Female" control={<Radio />} label="Female" />
					<FormControlLabel value="Male" control={<Radio />} label="Male" />
				</RadioGroup>
			</Spacer>
			<Spacer mt={16} style={{width:"85%"}}>
				<WeightInput 
					weight={weight}
					setWeight={setWeight}
					weightUnit={weightUnit}
					setWeightUnit={setWeightUnit}
					includeLabel
				/>    
			</Spacer>
			<Spacer mt={16} style={{display:"flex", justifyContent:"space-around", alignItems:"center", width:"50%"}}>
				<Text variant="body1">Age</Text>
				<TextField
					autoComplete='off'
					type='string'
					size="small"
					onChange={handleAge}
					sx={{width:"100px"}}
					value={age}
					label="Years"
				></TextField>
			</Spacer>			
			<Spacer mt={16}>
				<FormGroup>
					<div>
						<FormControlLabel control={<Checkbox  onChange={handleBurn} size='small'/>} label="Burns?" />
						<FormControlLabel control={<Checkbox  onChange={handleTrauma} size='small'/>} label="Trauma?" />
					</div>
					<div>
						<FormControlLabel control={<Checkbox  onChange={handleVent} size='small'/>} label="On Vent?" />
						<FormControlLabel control={<Checkbox  onChange={handleObese} size='small'/>} label="Obese?" />
					</div>					
				</FormGroup>
			</Spacer>
			<Spacer mt={16}>
				<Paper sx={{padding:"10px"}}>
					<Text variant="h6">{output}</Text>
				</Paper>
			</Spacer>
			<Spacer mt={16} mb={16}>            
				<FormulaPopover>
					<div
						style={{
							display:"flex"
						}}
					>
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>On Vent: </Text>
						<Text variant="body1">1784 - (11 × age) + (5 × weight in kg) + 244(if male) + 239(if trauma) + 804(if burns)</Text>
					</div>
					<Spacer
						mt={4}
						style={{
							display:"flex"
						}}
					>
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>Spontaneously Breathing: </Text>
						<Text variant="body1">629 - (11 × age) + (25 × weight in kg) - 609(if obese)</Text>
					</Spacer>
				</FormulaPopover>
			</Spacer>
		</div>
	);
}

/*
current uses 2002 version

variables
ventDependent: Bool;
age: number;
weight: number;
weightUnit: string;
gender: string;
Trauma: boolean;
burn: boolean;
obesity: boolean;

Ventilator-dependent:
IJEE(v) = 1784 - 11(A)+ 5(W)+244 (G) + 239(T) + 804(B)
       2002 version (revised 1997 equation).

Spontaneously Breathing:
IJEE(s) = 629 - 11 (A) + 25 (W) - 609 (O)

IJEE = kcal/day; A = age (yrs); W = actual wt(kg); G = gender(male=1, female=0); T = trauma, B = burn, O=obesity( if present=1, absent=0)
No additional factor is added for activity or injury
*/