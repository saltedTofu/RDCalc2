import Header from "../Header/Header";
import {Paper, Typography, Stack, Box, Tabs, Tab} from "@mui/material";
import {SetStateAction, useEffect,useState} from "react";
import PropTypes from "prop-types";
import Footer from "../Footer/Footer";
import Spacer from "../Design/Spacer";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/useWindowSize";
import { mobileWidth } from "../../constants/mobileWidth";

function TabPanel(props:any) {
	const { children, value, index, ...other } = props;
  
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			style={{marginLeft:"7%", width:"100%"}}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
  
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
  
function a11yProps(index:any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

interface ReleaseNotesProps {
    currentTheme:string;
    handleThemeChange: (event: {
        target: {
            value: SetStateAction<string>;
        };
    }) => void;
    setCurrentTheme:React.Dispatch<SetStateAction<string>>;
}

function ReleaseNotes({currentTheme,handleThemeChange, setCurrentTheme}:ReleaseNotesProps){

	const Auth = useAuth();
	const changeTheme = Auth?.changeTheme;

	const [backgroundColor,setBackgroundColor]=useState("#333333");
	const [value,setValue] = useState(0);

	const globalUser = useSelector((state:any) => state.calcsArray.globalUser);
	const width = useWindowSize();
	console.log(useWindowSize());

	useEffect(()=>{
		if(currentTheme==="dark"){
			setBackgroundColor("#1E1E1E");
		}
		else if(currentTheme==="lofi"){
			setBackgroundColor("#300E3F");
		}
	},[currentTheme]);

	const handleChange = (event:React.SyntheticEvent, newValue:number) => {
		setValue(newValue);
	};

	useEffect(()=>{ //updates users theme in the DB
		if(globalUser){
			changeTheme(globalUser,currentTheme);
		}
	},[currentTheme, changeTheme]);

	const styles:any={
		versionNote:{
			margin:"20px",
			display:"flex",
			flexDirection:"column",
			justifyContent:"center",
			alignItems:"left",
		},
	};
	console.log(width, mobileWidth);
	return(
		<Paper sx={{
			backgroundColor:backgroundColor,
			width:"100vw",
			height:"100%",
			minHeight:"100vh",
			display: "flex",
			flexDirection:"column",
			alignItems:"center",
			justifyContent:"flex-start",
		}}>
			<Header 
				currentTheme={currentTheme} 
				handleThemeChange={handleThemeChange} 
				setCurrentTheme={setCurrentTheme}
			/>
			<div 
				style={width <= mobileWidth 
					? {
						display:"flex",
						flexDirection:"column",
						justifyContent:"flex-start",
						alignItems:"center",
						width:"100%",
						height:"100%",
						minHeight:"100vh",
					} 
					: {
						display:"flex",
						flexDirection:"row",
						justifyContent:"flex-start",
						alignItems:"flex-start",
						width:"100%",
						height:"100%",
						minHeight:"100vh"
					}}
			>
				<Tabs orientation={width <= mobileWidth ? "horizontal" : "vertical"} onChange={handleChange} value={value} sx={width <= mobileWidth ? {} : {paddingTop:"20%", minWidth:"110px"}}>
					<Tab label="Release Notes" {...a11yProps(0)}/>
					<Tab label="Upcoming Features" {...a11yProps(1)}/>
				</Tabs>
				<TabPanel value={value} index={0}>
					<Spacer mt={32} mb={4}>
						<Typography 
							variant="h3" 
							sx={{
								width:"80%",
								textAlign:"center",
								fontWeight:"bold",
							}}
						>
							Release Notes
						</Typography>
					</Spacer>
					<Stack spacing={1} sx={styles.versionNote}>
						<Typography variant="h4" sx={{fontWeight:"bold"}}>Version 1.1</Typography>
						<Typography variant="h5">June 13, 2023</Typography>
						<Typography sx={{fontWeight:"bold"}}>What&apos;s New</Typography>
						<Typography>• Inches/Cm converter</Typography>
						<Typography>• Improved input validation for calculators</Typography>
						<Typography>• Calculators are now alphabetized in the select component</Typography>
						<Typography sx={{fontWeight:"bold"}}>Bug Fixes</Typography>
						<Typography>• Various app architecture and optimization changes</Typography>
						<Typography>• Paraplegic/Quadriplegic should now be exclusive and so should AKA/BKA for same leg</Typography>
						<Typography>• Fixed a bug where users with capital letters in their email would not be able to set favorite tube feeding formulas</Typography>
						<Typography>• Fixed spelling of &quot;Diabetisource AC&quot;</Typography>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Typography variant="h4" sx={{fontWeight:"bold"}}>Version 1.0.1</Typography>
						<Typography variant="h5">August 11, 2022</Typography>
						<Typography sx={{fontWeight:"bold"}}>Bug Fixes</Typography>
						<Typography>• Fixed a bug where micronutrient amounts were calculated incorrectly</Typography>
						<Typography>• Updated version number in footer</Typography>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Typography variant="h4" sx={{fontWeight:"bold"}}>Version 1.0</Typography>
						<Typography variant="h5">August 10, 2022</Typography>
						<Typography sx={{fontWeight:"bold"}}>What&apos;s New</Typography>
						<Typography>• Added release notes route (the page you are currently reading)</Typography>
						<Typography>• Micronutrients added to tube feeding calculator</Typography>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Typography variant="h4" sx={{fontWeight:"bold"}}>Version 0.9.1</Typography>
						<Typography variant="h5">July 26, 2022</Typography>
						<Typography sx={{fontWeight:"bold"}}>What&apos;s New</Typography>
						<Typography>• Added version number to footer</Typography>
						<Typography>• Theme is now saved for each user when logged in, so your chosen theme should automatically be used when logging in</Typography>
						<Typography sx={{fontWeight:"bold"}}>Bug Fixes</Typography>
						<Typography>• Signing up will now correctly reroute user back to the home page</Typography>
						<Typography>• Renalcal kcal information fixed to correct value</Typography>
					</Stack>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<Typography 
						variant="h3" 
						sx={{
							width:"80%",
							textAlign:"center",
							fontWeight:"bold",
						}}
					>
						Upcoming Features
					</Typography>
					<Stack 
						spacing={1} 
						sx={{
							margin:"20px",
							textAlign:"left"
						}}
					>
						<Typography>• Additional themes </Typography>
						<Typography variant="h5" sx={{textDecoration:"underline", }}>Calculators</Typography>
						<Typography>• Harris Benedict</Typography>
						<Typography>• Ireton Jones</Typography>
						<Typography>• Modified Penn State</Typography>
						<Typography>• Kcal from Propofol</Typography>
						<Typography>• Kcal from dextrose</Typography>
						<Typography>• Kcal from alcohol</Typography>
						<Typography>• Inches/Cm converter</Typography>
						<Typography>• Supplement Nutrition Facts Database</Typography>
					</Stack>
				</TabPanel>

			</div>
			<Footer />
		</Paper>
	);
}

export default ReleaseNotes;