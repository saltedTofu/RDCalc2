import "../App.css";
import { adjustCalcCounter, addCalc} from "../redux/calcs";
import {useSelector, useDispatch} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@mui/material";
import {SetStateAction, useLayoutEffect} from "react";
import Header from "./Header/components/Header";
import Body from "./Body/components/Body";
import AddButton from "./AddButton/components/AddButton";
import CalculatorContainer from "./Body/components/CalculatorContainer";
import Footer from "./Footer/components/Footer";
import {Paper, Alert} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MobileCalculatorContainer from "./MobileCalculatorContainer/components/MobileCalculatorContainer";
import "./Home.css";
import {useAuth} from "../contexts/AuthContext";
import Spacer from "../components/Spacer";
import { useWindowSize } from "../hooks/useWindowSize";
import { mobileWidth } from "../constants";

interface Props {
	currentTheme:string;
	setCurrentTheme:React.Dispatch<SetStateAction<string>>;
	handleThemeChange:(event: {
		target: {
			value: SetStateAction<string>;
		};
	}) => void
}
function Home({currentTheme, handleThemeChange, setCurrentTheme}:Props){

	const width = useWindowSize();
	const calcCounter = useSelector((state:any) => state.calcsArray.calcCounter);
	const globalUser = useSelector((state:any) => state.calcsArray.globalUser);
	const dispatch = useDispatch();
	const Auth = useAuth();
	const changeTheme = Auth?.changeTheme;

	const addNewCalc = () => {
		dispatch(addCalc(<div key={calcCounter} data-grid={{ x: 0, y: 0, w: 4, h: 3, minW:4, maxW:4, minH:3}} id={calcCounter}>{<CalculatorContainer  key={calcCounter} id={calcCounter}/>}</div>));
		dispatch(adjustCalcCounter(1));
	};

	useLayoutEffect(()=>{ //updates users theme in the DB
		async function updateThemePreference(){
			if(globalUser){
				await changeTheme(globalUser,currentTheme);				
			}
		}
		updateThemePreference();
	},[currentTheme, changeTheme]);

	return(
		<Paper component="div" className="App" square={true}>
			<Header 
				currentTheme={currentTheme} 
				handleThemeChange={handleThemeChange}
				setCurrentTheme={setCurrentTheme}
			/>
			<div id='warningAddNotes'>
				<Alert className="doubleCheckWarning" color="info" sx={width > mobileWidth ? {width:"400px"} : {width:"100%"}}>Please Note: All calculations should be double checked for accuracy</Alert>
				<AddButton
					addNewCalc={addNewCalc}
					currentTheme={currentTheme}
				/>
				<Spacer mt={width <= mobileWidth? 16 : undefined}>
					<RouterLink to='/release-notes'>
						<Link>Release Notes</Link>
					</RouterLink>
				</Spacer>
				<div style={{width:"240px"}} className="emptyDiv"></div>
			</div>
			{width > mobileWidth && <Body />}
			{width <= mobileWidth && 
					<Spacer mt={16} mb={8} style={{width:"100%"}}>
						<MobileCalculatorContainer />
					</Spacer> }
			<Footer />
		</Paper>
	);
}

export default Home;