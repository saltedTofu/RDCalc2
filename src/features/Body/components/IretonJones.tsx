import {TextField, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Spacer from "components/Spacer";
import Text from "components/Text";
import WeightInput from "components/WeightInput";
import {useState, useEffect} from "react";
import FormulaPopover from "components/FormulaPopover";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";

export default function IretonJones(){

	const [version, setVersion] = useState("revised");
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
			if(version==="revised"){
				kcal = 1784 - 11 * (Number(age)) + 5 * (weightInKg) + 244 * (gender==="Male" ? 1 : 0) + 239 * (trauma ? 1 : 0) + 804 * (burn ? 1 : 0);
			}
			else{
				kcal = 1925 - 10 * (Number(age)) + 5 * (weightInKg) + 281 * (gender==="Male" ? 1 : 0) + 292 * (trauma ? 1 : 0) + 851 * (burn ? 1 : 0);
			}
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

	const handleVersion = (event: any) => {
		setVersion(event.target.value);
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
				<ToggleButtonGroup
					size="large" 
					aria-label="Choose 2002 or 1992 Ireton Jones"
					exclusive
					onChange={handleVersion}
					value={version}
				>
					<ToggleButton value="original">Original (1992)</ToggleButton>
					<ToggleButton value="revised">Revised (2002)</ToggleButton>
				</ToggleButtonGroup>
			</Spacer>
			<Spacer mt={16}>
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
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>On Vent(1992): </Text>
						<Text variant="body1">1784 - (10 × age) + (5 × weight in kg) + 281(if male) + 292(if trauma) + 851(if burns)</Text>
					</div>
					<Spacer
						mt={4}
						style={{
							display:"flex"
						}}
					>
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>On Vent(2002): </Text>
						<Text variant="body1">1784 - (11 × age) + (5 × weight in kg) + 244(if male) + 239(if trauma) + 804(if burns)</Text>
					</Spacer>
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