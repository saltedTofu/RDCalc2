import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home";
import ReleaseNotes from "./components/ReleaseNotes/ReleaseNotes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../node_modules/react-grid-layout/css/styles.css";
import {ThemeProvider } from "@mui/material/styles";
import darkTheme from "./themes/dark";
import lofiTheme from "./themes/lofi.js";
import {useState, useEffect, SetStateAction} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";

function App() {
	const [currentTheme,setCurrentTheme] = useState("dark");
	const [themeObject,setThemeObject] = useState(darkTheme);

	useEffect(()=>{
		if(currentTheme==="dark"){
			setThemeObject(darkTheme);
		}
		else if(currentTheme==="lofi"){
			setThemeObject(lofiTheme);
		}
	},[currentTheme]);

	const handleThemeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		if(event.target.value==="dark"){
			setThemeObject(darkTheme);
		}
		else if(event.target.value==="lofi"){
			setThemeObject(lofiTheme);
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
