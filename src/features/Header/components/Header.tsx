import "./Header.css";
import {Button, Paper, Box, TextField, Select, MenuItem, Typography, Alert} from "@mui/material";
import {useState, useLayoutEffect, useRef, useEffect, SetStateAction} from "react";
import Logo from "assets/logo.png";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setGlobalUser } from "../../../redux/calcs";
import {useAuth} from "../../../contexts/AuthContext";
import Coffee from "assets/black-button.png";

interface Props {
    currentTheme:string;
    setCurrentTheme:React.Dispatch<SetStateAction<string>>;
    handleThemeChange:(event: {
        target: {
            value: SetStateAction<string>;
        };
    }) => void
}

function Header({currentTheme, handleThemeChange, setCurrentTheme}:Props){

	const Auth = useAuth();
	const login = Auth?.login;
	const currentUser = Auth?.currentUser;
	const logout = Auth?.logout;
	const getTheme = Auth?.getTheme;

	//global state from redux
	const dispatch = useDispatch();

	//local state
	const [user,setUser] = useState("");
	const [iconBackground,setIconBackground] = useState("#0288d1");
	const [error,setError] = useState("");
	const [loading,setLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();

	useEffect(()=>{
		async function grabTheme(){
			if(user){
				const savedTheme = await getTheme(user);
				await setCurrentTheme(savedTheme);
			}
		}
		grabTheme();
	},[user,getTheme,setCurrentTheme]);

	useEffect(()=>{
		dispatch(setGlobalUser(user));
	},[user,dispatch]);

	useLayoutEffect(()=>{
		if(currentTheme==="blue"){
			setIconBackground("#0288d1"); //blue
		}
		else if(currentTheme==="lofi"){
			setIconBackground("#703fb5"); //light pink
		}
		else if(currentTheme==="apple"){
			setIconBackground("#b12c2c"); //red
		}
		else if(currentTheme==="kiwi"){
			setIconBackground("#2ed851"); //red
		}
	},[currentTheme]);

	useLayoutEffect(()=>{
		if(currentUser){
			setUser(currentUser.email);
		}
		else{
			setUser("");
		}
	},[currentUser]);

	const handleLogin = async(event:React.FormEvent) => {
		event.preventDefault();
		if(!emailRef.current || !passwordRef.current){
			return;
		}
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to log in");
		}
		setLoading(false);
	};

	const handleLogout = async () => {
		try{
			setLoading(true);
			setUser("");
			await logout(currentUser.auth);
            
		}catch{
			setError("Failed to log out");
		}
		setLoading(false);
	};

	return(
		<Paper className="header" elevation={5} square={true}>
			<RouterLink to='/'>
				<div id="logoContainer" style={{backgroundColor:iconBackground}}>
					<img src={Logo} alt="dietitian calc" id='logoImage'/>
				</div>
			</RouterLink>
			<div style={{display: "flex", flexDirection:"row", alignItems:"center", position:"absolute", left:"100px"}}>
				<Typography style={{marginRight:"10px"}}>Theme</Typography>
				<Select
					onChange={handleThemeChange}
					value={currentTheme}
				>
					<MenuItem value='apple'sx={{backgroundColor:"#b12c2c"}}>Apple</MenuItem>
					<MenuItem value='blue' sx={{backgroundColor:"#0288d1"}}>Blue</MenuItem>
					<MenuItem value='kiwi'sx={{backgroundColor:"#2ed851"}}>Kiwi</MenuItem>
					<MenuItem value='lofi' sx={{backgroundColor:"#703fb5"}}>Lofi</MenuItem>										
				</Select>
			</div>
			<div style={{display: "flex", flexDirection:"row", alignItems:"center", position:"absolute"}} id="donateDiv">
				<a href="https://www.buymeacoffee.com/saltedTofu" target="_blank" rel="noreferrer">
					<img src={Coffee} width="160px" alt="Donate Button" id="donateButton"></img>
				</a>
			</div>
			<div className="loginFields">
				{user 
					?   (<Box style={{display: "flex", alignItems:"center",justifyContent:"center"}}>
						<Typography>Hello, {user}</Typography>
						<Button variant="contained" onClick={handleLogout} sx={{margin:"10px"}} disabled={loading}>Logout</Button>
					</Box>)
					:   (<form id="notLoggedIn" onSubmit={handleLogin} style={{display: "flex", alignItems:"center",justifyContent:"center"}}>
						{error && <Alert color="error">{error}</Alert>}
						<TextField label="Email" sx={{paddingRight:"5px", paddingLeft:"5px"}} inputRef={emailRef} id="emailInput"></TextField>
						<TextField label="Password" sx={{paddingRight:"5px", paddingLeft:"5px"}} inputRef={passwordRef} type="password" id="passwordInput"></TextField>
						<Button sx={{marginLeft:"10px"}} type="submit" disabled={loading} >Log in</Button>
						<RouterLink to='/signup'>
							<Button variant="contained" sx={{margin:"10px"}} disabled={loading}>Sign Up</Button>
						</RouterLink>
					</form>)}
			</div>
		</Paper>
	);
}
export default Header;