import {TextField, FormControl, FormGroup, Alert} from "@mui/material";
import {useRef, useState, useEffect, SetStateAction} from "react";
import Header from "../../Header/components/Header";
import {useAuth} from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Spacer from "../../../components/Spacer";
import Text from "components/Text";
import Button from "components/Button";
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


function SignUp({currentTheme,handleThemeChange, setCurrentTheme}:Props){

	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const passwordConfirmRef = useRef<HTMLInputElement>();
	const [error,setError] = useState("");
	const [success,setSuccess] = useState("");
	const [loading,setLoading] = useState(false);
	const Auth = useAuth();
	const signup = Auth?.signup;
	const addUser = Auth?.addUser;
	const navigate = useNavigate();

	useEffect(()=>{
		if(success){
			return navigate("/");
		}
	},[success]);

	const handleSubmit = async (event:React.FormEvent) => {
		event.preventDefault();
		if(!passwordRef.current || !passwordConfirmRef.current || !emailRef.current){
			return;
		}
		if(passwordRef.current.value !== passwordConfirmRef.current.value){
			return setError("Passwords do not match");
		}
		if(!emailRef.current.value){
			return setError("Please enter an email address");
		}
		try{
			setError("");
			setLoading(true);
			const validatedUserString = emailRef.current.value.toLowerCase();
			await signup(validatedUserString, passwordRef.current.value);
			await addUser(validatedUserString);
		} catch {
			setSuccess("");
			setError("Failed to create an account");
			setLoading(false);
			return;
		}
		setError("");
		setLoading(false);
		setSuccess("Account Created");
	};

	return(
		<div>
			<Surface
				square={true}
				sx={{
					width:"100vw",
					minHeight:"100vh",
					height:"100%",
					display:"flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<Header 
					currentTheme={currentTheme} 
					handleThemeChange={handleThemeChange} 
					setCurrentTheme={setCurrentTheme}
				/>
				<div
					style={{
						width:"100%",
						height:"90vh",
						display:"flex",
						justifyContent:"center",
						alignItems:"center",
					}}
				>
					<Surface 
						elevation={5}
						sx={{
							width:"400px",
							height:"fit-content",
							padding:"50px",
							display:"flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<form 
							onSubmit={handleSubmit} 
						>
							<Text variant="h2" sx={{marginLeft:"5px"}}>Sign Up</Text>                       
							<FormGroup sx={{width:"100%"}}>
								<FormControl>
									<Spacer mt={32}>
										<TextField label="Enter Email" inputRef={emailRef} autoComplete='off'></TextField>
									</Spacer>                                
								</FormControl>
							</FormGroup>
							<FormGroup sx={{width:"100%"}}>
								<FormControl>
									<Spacer mt={32}>
										<TextField label="Create Password" type="password" inputRef={passwordRef} autoComplete='off'></TextField>
									</Spacer>                                
								</FormControl>
							</FormGroup>
							<FormGroup sx={{width:"100%"}}>
								<FormControl>
									<Spacer mt={32} mb={16}>
										<TextField label="Confirm Password" type="password" inputRef={passwordConfirmRef} autoComplete='off'></TextField>
									</Spacer>                                
								</FormControl>
							</FormGroup>
							<Spacer mt={16} mb={32}>
								<Button size="medium" disabled={loading} fullWidth variant="contained" type="submit">Create Account</Button>
							</Spacer>                        
						</form>
					</Surface>
				</div>
				{error && 
					<Spacer mt={16}>
						<Alert color="error">{error}</Alert>
					</Spacer>}
				{success && 
					<Spacer mt={16}>
						<Alert color="success">{success}</Alert>
					</Spacer>}
			</Surface>
		</div>
	);
}
export default SignUp;