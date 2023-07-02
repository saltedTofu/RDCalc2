import "./App.css";
import SignUp from "./features/SignUp/components/SignUp";
import Home from "./features/Home";
import ReleaseNotes from "./features/ReleaseNotes/components/ReleaseNotes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../node_modules/react-grid-layout/css/styles.css";
import {ThemeProvider } from "@mui/material/styles";
import blueTheme from "./themes/blue";
import lofiTheme from "./themes/lofi";
import appleTheme from "./themes/apple";
import kiwiTheme from "./themes/kiwi";
import {useState, useEffect, SetStateAction} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
	const [currentTheme,setCurrentTheme] = useState("blue");
	const [themeObject,setThemeObject] = useState(blueTheme);

	useEffect(()=>{
		if(currentTheme==="blue"){
			setThemeObject(blueTheme);
		}
		else if(currentTheme==="lofi"){
			setThemeObject(lofiTheme);
		}
		else if(currentTheme==="apple"){
			setThemeObject(appleTheme);
		}
		else if(currentTheme==="kiwi"){
			setThemeObject(kiwiTheme);
		}
	},[currentTheme]);

	const handleThemeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		if(event.target.value==="blue"){
			setThemeObject(blueTheme);
		}
		else if(event.target.value==="lofi"){
			setThemeObject(lofiTheme);
		}
		else if(event.target.value==="apple"){
			setThemeObject(appleTheme);
		}
		else if(event.target.value==="kiwi"){
			setThemeObject(kiwiTheme);
		}
		setCurrentTheme(event.target.value);
	};

	return (
		<AuthProvider>
			<ThemeProvider theme={themeObject}>
				<Router>
					<Routes>
						<Route 
							path="/signup" 
							element={
								<SignUp 
									currentTheme={currentTheme} 
									handleThemeChange={handleThemeChange}
									setCurrentTheme={setCurrentTheme}

								/>
							} 
						/>
						<Route 
							path="/" 
							element={
								<Home 
									currentTheme={currentTheme} 
									handleThemeChange={handleThemeChange}
									setCurrentTheme={setCurrentTheme}
								/>
							} 
						/>
						<Route 
							path="/release-notes" 
							element={
								<ReleaseNotes 
									currentTheme={currentTheme} 
									handleThemeChange={handleThemeChange}
									setCurrentTheme={setCurrentTheme}
								/>
							}                                                                                 
						/>
					</Routes>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
