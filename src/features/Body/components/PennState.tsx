import { RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, SelectChangeEvent, ToggleButtonGroup, ToggleButton } from "@mui/material";
import {useState, useEffect, useMemo} from "react";
import WeightInput from "components/WeightInput";
import HeightInput from "components/HeightInput";
import { decimalInputValidation } from "utils/decimalInputValidation";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";
import Spacer from "components/Spacer";
import FormulaPopover from "components/FormulaPopover";
import Text from "components/Text";
import Surface from "components/Surface";

function PennState(){
	const [gender,setGender] = useState("");
	const [weight,setWeight] = useState("");
	const [weightUnit,setWeightUnit] = useState("Lbs");
	const [heightFeet,setHeightFeet] = useState("");
	const [heightInches,setHeightInches] = useState("");
	const [age,setAge] = useState("");
	const [activityFactor,setActivityFactor] = useState("1.2");
	const [penn,setPenn] = useState("");
	const [tMax,setTmax] = useState("");
	const [tMaxUnit,setTMaxUnit] = useState("Celsius");
	const [ve,setVe] = useState("");
	const [version, setVersion] = useState("original");
	const [mifflin, setMifflin] = useState(0);

	useMemo(()=>{
		//calculate mifflin
		let mifflinOutput=0;
		const heightInCm = ((Number(heightFeet)*12) + Number(heightInches))*2.54;
		const weightInKg = weightUnit==="Lbs" ? Number(weight)/2.205 : weight;
		if(gender==="male"){
			mifflinOutput = Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + 5)*Number(activityFactor));
		}
		else if(gender==="female"){
			mifflinOutput = Math.floor(((10*Number(weightInKg)) + (6.25*heightInCm) - (5*Number(age)) + - 161)*Number(activityFactor));
		}
		setMifflin(mifflinOutput);

	},[gender, weight, weightUnit, heightFeet, heightInches, activityFactor, age]);

	useEffect(()=>{
		let pennOutput="";
		let convertedTMax = Number(tMax);
		if(tMaxUnit==="Fahrenheit"){
			convertedTMax=(convertedTMax-32)*(5/9);
		}
		if(version==="original"){
			pennOutput = String(Math.round(mifflin*0.96 + convertedTMax*167 + Number(ve)*31 - 6212));
		}
		else{
			pennOutput = String(Math.round(mifflin*0.71 + convertedTMax*85 + Number(ve)*64 - 3085));
		}
		setPenn(pennOutput + " kcal");

	},[mifflin, tMax,tMaxUnit,ve, version]);

	const handleTmaxUnit = (event:SelectChangeEvent) => {
		setTMaxUnit(event.target.value);
	};
	const handleTmax = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = decimalInputValidation(event.target.value, 5, 199);
		setTmax(validatedString);
	};
	const handleVe = (event:React.ChangeEvent<HTMLInputElement>) =>{
		const validatedString = decimalInputValidation(event.target.value, 5, 99);
		setVe(validatedString);
	};
	const handleActivityFactor = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = decimalInputValidation(event.target.value, 3, 3);
		setActivityFactor(validatedString);
	};
	const handleGender = (event:SelectChangeEvent) => {
		setGender(event.target.value);
	};
	const handleAge = (event:React.ChangeEvent<HTMLInputElement>) =>{
		const validatedString = wholeNumberInputValidation(event.target.value, 3, 130);
		setAge(validatedString);
	};
	const handleVersion = (event: any) => {
		setVersion(event.target.value);
	};
	return(
		<div
			style={{
				display:"flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width:"100%",
			}}
		>            
			<Spacer mt={8}>
				<ToggleButtonGroup
					size="large" 
					aria-label="Choose 2003 or 2010 penn state"
					exclusive
					onChange={handleVersion}
					value={version}
				>
					<ToggleButton value="original">Original (2003)</ToggleButton>
					<ToggleButton value="modified">Modified (2010)</ToggleButton>
				</ToggleButtonGroup>
			</Spacer>
			<Spacer mt={8}>
				<RadioGroup
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
					id="gender-select"
					value={gender}
					onChange={handleGender}
					sx={{flexDirection:"row"}}
				>
					<FormControlLabel value="female" control={<Radio />} label="Female" />
					<FormControlLabel value="male" control={<Radio />} label="Male" />
				</RadioGroup>
			</Spacer>
			<Spacer mt={8} style={{width:"85%"}}>
				<HeightInput 
					feet={heightFeet}
					inches={heightInches}
					setFeet={setHeightFeet}
					setInches={setHeightInches}
					includeLabel={true}
				/>
			</Spacer>
			<Spacer mt={16} style={{width:"85%"}}>        
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
					display:"flex",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					width:"60%",
				}}
			>
				<Text variant="body1">Age</Text>
				<TextField
					autoComplete='off'
					type='number'
					label='Years'
					size="small"
					onChange={handleAge}
					sx={{width:"100px"}}
					value={age}
				>
				</TextField>
			</Spacer>
			<Spacer mt={16} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
				<Text variant="body1">Activity Factor</Text>
				<Spacer ml={8}>
					<TextField
						autoComplete='off'
						type="string"
						size='small'
						onChange={handleActivityFactor}
						sx={{width:"100px"}}
						value={activityFactor}
						placeholder='1'
					></TextField>
				</Spacer>
			</Spacer>
			<Spacer mt={16} style={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"80%"}}>
				<Text variant="body1">TMax</Text>
				<TextField
					autoComplete='off'
					type="string"
					size='small'
					onChange={handleTmax}                        
					value={tMax}
					label={tMaxUnit==="Fahrenheit" ? "°F" : "°C"}
					sx={{width:"100px"}}
				></TextField>
				<Select
					id="tMaxUnitInput"
					value={tMaxUnit}
					onChange={handleTmaxUnit}
					size="small"                      
					data-testid='temperature-unit'
				>
					<MenuItem value={"Celsius"} data-testid="celsius-select">Celsius</MenuItem>
					<MenuItem value={"Fahrenheit"} data-testid="fahrenheit-select">Fahrenheit</MenuItem>
				</Select>
			</Spacer>
			<Spacer mt={16} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
				<Text variant="body1">Minute Ventilation</Text>
				<TextField
					autoComplete='off'
					type="string"
					size='small'
					onChange={handleVe}
					sx={{width:"120px",marginLeft:"10px", marginRight:"5px"}}
					value={ve}
					label='VE in L/min'
				></TextField>
			</Spacer>
			<Spacer mt={16}>
				<Surface sx={{padding:"10px"}}>
					<Text variant="h6">{penn}</Text>
				</Surface>
			</Spacer>
			<Spacer mt={16} mb={16}>            
				<FormulaPopover>
					<div
						style={{
							display:"flex"
						}}
					>
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>Original (2003):</Text>
						<Text variant="body1">Mifflin(0.96) + Tmax(167) + Ve(31) - 6,212</Text>
					</div>
					<Spacer
						mt={4}
						style={{
							display:"flex"
						}}
					>
						<Text variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>Modified (2010):</Text>
						<Text variant="body1">Mifflin(0.71) + Tmax(85) + Ve(64) - 3,085</Text>
					</Spacer>                
				</FormulaPopover>
			</Spacer>
		</div>
	);
}

export default PennState;

