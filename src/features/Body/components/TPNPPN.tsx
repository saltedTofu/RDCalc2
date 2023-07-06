import {TextField} from "@mui/material";
import {useState, useEffect} from "react";
import {decimalInputValidation} from "utils/decimalInputValidation";
import WeightInput from "components/WeightInput";
import { wholeNumberInputValidation } from "utils/wholeNumberInputValidation";
import Spacer from "components/Spacer";
import Text from "components/Text";
import Slider from "components/Slider";
import Surface from "components/Surface";

function TPNPPN(){

	const [dextrose,setDextrose] = useState("");
	const [aminoAcid,setAminoAcid] = useState("");
	const [rate,setRate] = useState(50);
	const [hrsDay,setHrsDay] = useState("");
	const [kcal,setKcal] = useState(0);
	const [protein,setProtein] = useState(0);
	const [volume,setVolume] = useState(0);
	const [carbohydrates,setCarbohydrates] = useState(0);
	const [currentBodyWeight,setCurrentBodyWeight] = useState("");
	const [weightUnit,setWeightUnit] = useState("Lbs");
	const [GIR,setGIR] = useState(0);
	const [GIRError, setGIRError] = useState("");

	//Calculate TPN/PPN
	useEffect(()=>{
		const totalVolume = rate*Number(hrsDay);
		const carbs = Number(dextrose)*totalVolume*.01; //338.64
		const pro = Number(aminoAcid)*totalVolume*.01; //338.64
		const calories =(carbs*3.4) + (pro*4);
		setKcal(Math.round(calories));
		setProtein(Math.round(pro));
		setCarbohydrates(Math.round(carbs));
		setVolume(totalVolume);
	},[rate, hrsDay, dextrose, aminoAcid]);

	//Calculate GIR
	useEffect(()=>{
		if(!currentBodyWeight || Number(currentBodyWeight)===0){
			setGIRError("Please Enter Current Body Weight");
			return;
		}
		setGIRError("");
		let weightInKg:number;
		if(weightUnit==="Lbs"){
			weightInKg=Number(currentBodyWeight)/2.205;
		}
		else{
			weightInKg=Number(currentBodyWeight);
		}
		const glucoseInfusionRate = (rate*Number(dextrose)*1000)/(weightInKg*60*100);
		setGIR(Math.round(glucoseInfusionRate*10)/10);
	},[weightUnit,currentBodyWeight,carbohydrates, dextrose, rate]);

	//Event Handlers
	const handleDextrose = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = decimalInputValidation(event.target.value, 6, 99);
		setDextrose(validatedString);
	};
	const handleAminoAcid = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = decimalInputValidation(event.target.value, 6, 99);
		setAminoAcid(validatedString);
	};
	const handleHrsDay = (event:React.ChangeEvent<HTMLInputElement>) => {
		const validatedString = wholeNumberInputValidation(event.target.value, 2, 24);
		setHrsDay(validatedString);
	};
	const handleRate = (event:any) => {
		setRate(event.target.value);
	};

	return(
		<div 
			style={{
				display:"flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				width:"95%",
			}}
		>
			<Spacer 
				mt={8} 
				style={{
					display:"flex", 
					flexDirection:"row", 
					alignItems:"center", 
					width: "85%", 
					justifyContent:"space-around"
				}}
			>
				<TextField
					autoComplete='off'
					label="% Dextrose"
					value={dextrose}
					onChange={handleDextrose}
					type="string"
					sx={{width:"130px"}}
				></TextField>
				<TextField
					autoComplete='off'
					label="% Amino Acid"
					value={aminoAcid}
					onChange={handleAminoAcid}
					type="string"
					sx={{width:"130px"}}
				></TextField>
			</Spacer>
			<Spacer mt={16} style={{width:"100%"}}>
				<Slider
					defaultValue={rate}
					value={rate}
					onChange={handleRate}
					min={5}
					max={150}
					valueLabelDisplay="auto"
					sx={{width:"85%"}}
				/>
			</Spacer>
			<Spacer mt={8}>
				<Text variant="h6">{rate} ml/hr</Text>
			</Spacer>
			<Spacer mt={16}>       
				<TextField
					label="hrs/day"
					value={hrsDay}
					onChange={handleHrsDay}
					type="string"
					autoComplete='off'
				></TextField>
			</Spacer>  
			<Spacer mt={16}>
				<Surface sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"10px"}}>
					<Text variant="h6">{kcal} Kcal</Text>
					<Text variant="h6">{protein}g Protein</Text>
					<Text variant="h6">{carbohydrates}g Dextrose</Text>
					<Text variant="h6">{volume}ml Total Volume</Text>
				</Surface>
			</Spacer>
			<Spacer mt={16}>
				<Text variant="h5">Glucose Infusion Rate</Text>
			</Spacer>
			<Spacer mt={16} style={{width:"70%"}}>          
				<WeightInput 
					weight={currentBodyWeight}
					setWeight={setCurrentBodyWeight}
					weightUnit={weightUnit}
					setWeightUnit={setWeightUnit}
					variant="medium"
				/>
			</Spacer>
			<Spacer mt={16} mb={16}>
				<Surface 
					sx={{
						display:"flex",
						flexDirection:"column",
						justifyContent:"center",
						alignItems:"flex-start",
						padding:"10px"
					}}
				>
					{GIRError ? <Text variant="h6">{GIRError}</Text> : <Text variant="h6">{GIR} mg/kg/min</Text>}
				</Surface>
			</Spacer>
            
		</div>
	);
}

export default TPNPPN;