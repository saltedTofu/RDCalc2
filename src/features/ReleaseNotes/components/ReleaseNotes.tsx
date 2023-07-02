import Header from "../../Header/components/Header";
import {Paper, Stack, Box, Tabs, Tab} from "@mui/material";
import {SetStateAction, useEffect,useState} from "react";
import PropTypes from "prop-types";
import Footer from "../../Footer/components/Footer";
import Spacer from "../../../components/Spacer";
import { useAuth } from "../../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { mobileWidth } from "../../../constants";
import Text from "components/Text";

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
					<Text variant="body1">{children}</Text>
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

	const [value,setValue] = useState(0);

	const globalUser = useSelector((state:any) => state.calcsArray.globalUser);
	const width = useWindowSize();


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
						<Text 
							variant="h3" 
							sx={{
								width:"80%",
								textAlign:"center",
								fontWeight:"bold",
							}}
						>
							Release Notes
						</Text>
					</Spacer>
					<Stack spacing={1} sx={styles.versionNote}>
						<Text variant="h4" sx={{fontWeight:"bold"}}>Version 1.1</Text>
						<Text variant="h5">June 13, 2023</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>What&apos;s New</Text>
						<Text variant="body1">• Inches/Cm converter</Text>
						<Text variant="body1">• Improved input validation for calculators</Text>
						<Text variant="body1">• Calculators are now alphabetized in the select component</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>Bug Fixes</Text>
						<Text variant="body1">• Various app architecture and optimization changes</Text>
						<Text variant="body1">• Paraplegic/Quadriplegic should now be exclusive and so should AKA/BKA for same leg</Text>
						<Text variant="body1">• Fixed a bug where users with capital letters in their email would not be able to set favorite tube feeding formulas</Text>
						<Text variant="body1">• Fixed spelling of &quot;Diabetisource AC&quot;</Text>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Text variant="h4" sx={{fontWeight:"bold"}}>Version 1.0.1</Text>
						<Text variant="h5">August 11, 2022</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>Bug Fixes</Text>
						<Text variant="body1">• Fixed a bug where micronutrient amounts were calculated incorrectly</Text>
						<Text variant="body1">• Updated version number in footer</Text>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Text variant="h4" sx={{fontWeight:"bold"}}>Version 1.0</Text>
						<Text variant="h5">August 10, 2022</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>What&apos;s New</Text>
						<Text variant="body1">• Added release notes route (the page you are currently reading)</Text>
						<Text variant="body1">• Micronutrients added to tube feeding calculator</Text>
					</Stack>
					<Stack spacing={1} sx={styles.versionNote}>
						<Text variant="h4" sx={{fontWeight:"bold"}}>Version 0.9.1</Text>
						<Text variant="h5">July 26, 2022</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>What&apos;s New</Text>
						<Text variant="body1">• Added version number to footer</Text>
						<Text variant="body1">• Theme is now saved for each user when logged in, so your chosen theme should automatically be used when logging in</Text>
						<Text variant="body1" sx={{fontWeight:"bold"}}>Bug Fixes</Text>
						<Text variant="body1">• Signing up will now correctly reroute user back to the home page</Text>
						<Text variant="body1">• Renalcal kcal information fixed to correct value</Text>
					</Stack>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<Text 
						variant="h3" 
						sx={{
							width:"80%",
							textAlign:"center",
							fontWeight:"bold",
						}}
					>
						Upcoming Features
					</Text>
					<Stack 
						spacing={1} 
						sx={{
							margin:"20px",
							textAlign:"left"
						}}
					>
						<Text variant="body1">• Additional themes </Text>
						<Text variant="h5" sx={{textDecoration:"underline", }}>Calculators</Text>
						<Text variant="body1">• Harris Benedict</Text>
						<Text variant="body1">• Ireton Jones</Text>
						<Text variant="body1">• Modified Penn State</Text>
						<Text variant="body1">• Kcal from Propofol</Text>
						<Text variant="body1">• Kcal from dextrose</Text>
						<Text variant="body1">• Kcal from alcohol</Text>
						<Text variant="body1">• Inches/Cm converter</Text>
						<Text variant="body1">• Supplement Nutrition Facts Database</Text>
					</Stack>
				</TabPanel>

			</div>
			<Footer />
		</Paper>
	);
}

export default ReleaseNotes;