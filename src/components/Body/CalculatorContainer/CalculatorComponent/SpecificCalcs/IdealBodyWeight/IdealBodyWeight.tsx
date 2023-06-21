import {Paper, Typography, Checkbox, FormGroup, Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {useState, useEffect} from "react";
import WeightInput from "../components/WeightInput";
import HeightInput from "../components/HeightInput";
import Spacer from "../../../../../Design/Spacer";
import FormulaPopover from "../components/FormulaPopover";

function IdealBodyWeight(){
	const [gender,setGender] = useState("");
	const [heightFeet,setHeightFeet] = useState("");
	const [heightInches,setHeightInches] = useState("");
	const [weightUnit,setWeightUnit] = useState("Lbs");
	const [weight,setWeight] = useState("");
	const [IBW, setIBW] = useState("");
	const [percentIBW,setPercentIBW] = useState("");
	const [LBKA, setLBKA] = useState(false);
	const [RBKA, setRBKA] = useState(false);
	const [LAKA, setLAKA] = useState(false);
	const [RAKA, setRAKA] = useState(false);
	const [paraplegic, setParaplegic] = useState(false);
	const [quadriplegic, setQuadriplegic] = useState(false);
	const [BMI,setBMI] = useState("");
	const [adjusted,setAdjusted] = useState(false);

	useEffect(()=>{
		if(!gender){
			setIBW("Please Select Gender");
			return;
		}
		else if(!heightFeet){
			setIBW("Please Enter Height");
			setPercentIBW("Please Enter Height");
			return;
		}
		else if(!weight){
			setPercentIBW("Please Enter Weight");
		}

		const totalHeight = (Number(heightFeet)*12) + Number(heightInches);
		let weightModifier = 1;
		if(LBKA) weightModifier -= .06;
		if(RBKA) weightModifier -= .06;
		if(LAKA) weightModifier -= .16;
		if(RAKA) weightModifier -= .16;
		if(paraplegic) weightModifier -= .125; //range is 10%-15%
		if(quadriplegic) weightModifier -= .175; //range is 15%-20%

		
		//BMI Calculations
		let adjustedWeight=Number(weight);
		if(weightModifier<1){ //adjusted weight for amputation/paralyzations
			adjustedWeight = adjustedWeight*(1+(1-weightModifier));
			setAdjusted(true);
		}
		else{
			setAdjusted(false);
		}
		if(weightUnit==="Lbs"){
			const convertedWeight=Number(adjustedWeight)/2.205;
			const convertedHeight=totalHeight*2.54/100;
			const calculatedBMI = Math.round(convertedWeight/(convertedHeight*convertedHeight)*10)/10; //round to 1 decimal place
			setBMI(String(calculatedBMI));
		}
		else{
			const convertedHeight=totalHeight*2.54/100;
			const calculatedBMI = Math.round(adjustedWeight/(convertedHeight*convertedHeight)*10)/10; //round to 1 decimal place
			setBMI(String(calculatedBMI));
		}

		if(totalHeight<60){
			const inchesBelowFiveFeet = 60-totalHeight; 
			if(gender==="male"){
				const IBWMale = Math.round((106-2*(inchesBelowFiveFeet))*weightModifier);
				setIBW(IBWMale + " lbs or " + Math.round(IBWMale/2.2) + " kg");
				if(weightUnit==="Kg"){
					setPercentIBW(Math.round((Number(weight)*2.2)/IBWMale*100) + "%");
				}
				else setPercentIBW(Math.round(Number(weight)/IBWMale*100) + "%");
			}
			else if(gender==="female"){
				const IBWFemale = Math.round((100-2*(inchesBelowFiveFeet))*weightModifier);
				setIBW(IBWFemale + "lbs or " + Math.round(IBWFemale/2.2) + " kg");
				if(weightUnit==="Kg"){
					setPercentIBW(Math.round((Number(weight)*2.2)/IBWFemale*100) + "%");
				}
				else setPercentIBW(Math.round(Number(weight)/IBWFemale*100) + "%");
			}
			return;
		}
		if(gender==="male"){
			const IBWMale = Math.round((106 + 6*(totalHeight-60))*weightModifier); //works if over 5 feet
			setIBW(IBWMale + " lbs or " + Math.round(IBWMale/2.2) + " kg");
			if(weightUnit==="Kg"){
				setPercentIBW(Math.round((Number(weight)*2.2)/IBWMale*100) + "%");
			}
			else setPercentIBW(Math.round(Number(weight)/IBWMale*100) + "%");
			
		}
		else if(gender==="female"){
			const IBWFemale = Math.round((100 + 5*(totalHeight-60))*weightModifier); //works if over 5 feet
			setIBW(IBWFemale + " lbs or " + Math.round(IBWFemale/2.2) + " kg");
			if(weightUnit==="Kg"){
				setPercentIBW(Math.round((Number(weight)*2.2)/IBWFemale*100) + "%");
			}
			else setPercentIBW(Math.round(Number(weight)/IBWFemale*100) + "%");
		}
	},[gender,heightFeet,heightInches,weight,weightUnit,LBKA,RBKA,LAKA,RAKA,paraplegic,quadriplegic]);

	const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGender(event.target.value);
	};
	const handleLBKA = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setLBKA(true);
		}
		else setLBKA(false);
	};
	const handleRBKA = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setRBKA(true);
		}
		else setRBKA(false);
	};
	const handleLAKA = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setLAKA(true);
		}
		else setLAKA(false);
	};
	const handleRAKA = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setRAKA(true);
		}
		else setRAKA(false);
	};
	const handleParaplegic = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setParaplegic(true);
		}
		else setParaplegic(false);
	};
	const handleQuadriplegic = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked){
			setQuadriplegic(true);
		}
		else setQuadriplegic(false);
	};
	return(
		<div
			style={{
				display:"flex",
				flexDirection: "column",
				width:"93%",
				height:"90%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>            
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
			<Spacer mt={8} style={{width:"100%"}}>
				<HeightInput 
					feet={heightFeet}
					inches={heightInches}
					setFeet={setHeightFeet}
					setInches={setHeightInches}
					includeLabel={true}
				/>
			</Spacer>            
			<Spacer mt={16}>
				<WeightInput 
					weight={weight}
					setWeight={setWeight}
					weightUnit={weightUnit}
					setWeightUnit={setWeightUnit}
					variant="small"
					includeLabel={true}
					style={{width:"300px"}}
				/>
			</Spacer>
			<Spacer mt={16}>
				<div 
					style={{
						display:"flex", 
						flexDirection:"row", 
						alignItems:"flex-start",
						justifyContent:"center",
						width:"100%",
						paddingLeft:"16px"
					}}
				>
					<Spacer mr={4}>
						<Typography variant="h6">Amputations?</Typography>
						<FormGroup>
							<FormControlLabel control={<Checkbox disabled={LAKA ? true : false} onChange={handleLBKA} size='small'/>} label="L BKA (6%)" />
							<FormControlLabel control={<Checkbox disabled={RAKA ? true : false} onChange={handleRBKA} size='small'/>} label="R BKA (6%)" />
							<FormControlLabel control={<Checkbox disabled={LBKA ? true : false} onChange={handleLAKA} size='small'/>} label="L AKA (16%)" />
							<FormControlLabel control={<Checkbox disabled={RBKA ? true : false} onChange={handleRAKA} size='small'/>} label="R AKA (16%)" />
						</FormGroup>
					</Spacer>
					<Spacer ml={4}>
						<Typography variant="h6">Paralyzations?</Typography>
						<FormGroup>
							<FormControlLabel control={<Checkbox disabled={quadriplegic ? true : false} onChange={handleParaplegic}size='small'/>} label="Paraplegic (12.5%)" />
							<FormControlLabel control={<Checkbox disabled={paraplegic ? true : false} onChange={handleQuadriplegic}size='small'/>} label="Quadriplegic (17.5%)" />
						</FormGroup>
					</Spacer>
				</div>
			</Spacer>
			<Spacer mt={8}>
				<Paper 
					sx={{
						display:"flex",
						flexDirection:"column",
						justifyContent:"center",
						alignItems:"center",
						padding:"10px"
					}}
				>
					<Typography variant="h6">IBW={IBW}</Typography>
					<Typography variant="h6">%IBW={percentIBW}</Typography>
					<div 
						style={{
							display:"flex", 
							alignItems:"center", 
							justifyContent:"center"
						}}
					>
						{adjusted &&
							<Spacer mr={4}>
								<Typography>(adjusted)</Typography>
							</Spacer>                        
						}
						<Typography variant="h6">BMI={BMI}</Typography>
					</div>
				</Paper>
			</Spacer>
			<Spacer mt={16} mb={16}>
				<FormulaPopover>
					<div
						style={{
							display:"flex"
						}}
					>
						<Typography variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>Male:</Typography>
						<Typography variant="body1">106 + 6 × (Inches taller than 5 feet)</Typography>
					</div>
					<Spacer
						mt={4}
						style={{
							display:"flex"
						}}
					>
						<Typography variant="body1" sx={{fontWeight:"bold", textDecoration:"underline", paddingRight:"4px"}}>Female:</Typography>
						<Typography variant="body1">100 + 5 × (Inches taller than 5 feet)</Typography>
					</Spacer>
					
				</FormulaPopover>
			</Spacer>
			
		</div>
	);
}
export default IdealBodyWeight;