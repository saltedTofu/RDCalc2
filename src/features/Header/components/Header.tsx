import {Box, TextField, Select, MenuItem, Alert} from "@mui/material";
import {useState, useLayoutEffect, useRef, useEffect, SetStateAction} from "react";
import Logo from "assets/logo.png";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setGlobalUser } from "redux/calcs";
import {useAuth} from "contexts/AuthContext";
import Coffee from "assets/black-button.png";
import Text from "components/Text";
import Button from "components/Button";
import { red, orange, purple, blue, kiwiGreen } from "constants/colors";
import { useWindowSize } from "hooks/useWindowSize";
import { mobileWidth } from "constants/index";
import Surface from "components/Surface";

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
	const width = useWindowSize();

	//global state from redux
	const dispatch = useDispatch();

	//local state
	const [user,setUser] = useState("");
	const [iconBackground,setIconBackground] = useState(blue);
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
	},[user]);

	useEffect(()=>{
		dispatch(setGlobalUser(user));
	},[user,dispatch]);

	useLayoutEffect(()=>{
		if(currentTheme==="blue"){
			setIconBackground(blue); //blue
		}
		else if(currentTheme==="lofi"){
			setIconBackground(purple); //purple
		}
		else if(currentTheme==="apple"){
			setIconBackground(red); //red
		}
		else if(currentTheme==="kiwi"){
			setIconBackground(kiwiGreen); //green
		}
		else if(currentTheme==="orange"){
			setIconBackground(orange); //orange
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
		<Surface
			sx={{
				height:"fit-content",
				display:"flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				width:"100%",
			}} 
			elevation={5} 
			square={true}
		>
			<RouterLink to='/'>
				<div 
					style={{
						backgroundColor:iconBackground,
						width:"65px",
						height:"65px"
					}}
				>
					<img 
						src={Logo} 
						alt="dietitian calc" 
						style={{
							width:"65px"
						}}
					/>
				</div>
			</RouterLink>
			<div style={{display: "flex", flexDirection:"row", alignItems:"center", position:"absolute", left:"100px"}}>
				<Text variant="body1" sx={{marginRight:"10px"}}>Theme</Text>
				<Select
					onChange={handleThemeChange}
					value={currentTheme}
				>
					<MenuItem value='apple'sx={{backgroundColor:red}}>Apple</MenuItem>
					<MenuItem value='blue' sx={{backgroundColor:blue}}>Blue</MenuItem>
					<MenuItem value='kiwi'sx={{backgroundColor:kiwiGreen}}>Kiwi</MenuItem>
					<MenuItem value='lofi' sx={{backgroundColor:purple}}>Lofi</MenuItem>
					<MenuItem value='orange' sx={{backgroundColor:orange}}>Orange</MenuItem>										
				</Select>
			</div>
			<div 
				style={{
					display: "flex", 
					flexDirection:"row", 
					alignItems:"center", 
					position:"absolute",
					left: width < mobileWidth ? "275px" : "280px"
				}} 
			>
				<a href="https://www.buymeacoffee.com/saltedTofu" target="_blank" rel="noreferrer">
					<img 
						src={Coffee} 
						width={width < mobileWidth ? "125px" : "160px"}
						alt="Donate Button" 
					></img>
				</a>
			</div>
			{ width > 850 && <div>
				{user 
					?   (<Box style={{display: "flex", alignItems:"center",justifyContent:"center"}}>
						<Text variant="body1">Hello, {user}</Text>
						<Button size="medium" variant="contained" onClick={handleLogout} sx={{margin:"10px"}} disabled={loading}>Logout</Button>
					</Box>)
					:   (<form id="notLoggedIn" onSubmit={handleLogin} style={{display: "flex", alignItems:"center",justifyContent:"center"}}>
						{error && <Alert color="error">{error}</Alert>}
						<TextField 
							label="Email" 
							sx={{
								paddingRight:"5px", 
								paddingLeft:"5px",
								width:(width <= 1050 ? (width <= 890 ? "90px" : "110px") : "auto")
							}} 
							inputRef={emailRef} 							
						></TextField>
						<TextField 
							label="Password" 
							sx={{
								paddingRight:"5px", 
								paddingLeft:"5px",
								width:(width <= 1050 ? (width <= 890 ? "90px" : "110px") : "auto")
							}} 
							inputRef={passwordRef} 
							type="password" 							
						></TextField>
						<Button  size="medium" variant="text" sx={{marginLeft:"10px"}} type="submit" disabled={loading}>Log in</Button>
						<RouterLink to='/signup'>
							<Button size="medium" variant="contained" sx={{margin:"10px"}} disabled={loading}>Sign Up</Button>
						</RouterLink>
					</form>)}
			</div>}
		</Surface>
	);
}
export default Header;