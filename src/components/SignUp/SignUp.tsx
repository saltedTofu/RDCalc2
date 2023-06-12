import {Paper, Typography, TextField, Button, FormControl, FormGroup, Alert} from '@mui/material';
import {useRef, useState, useEffect, SetStateAction} from 'react'
import Header from '../Header/Header';
import {useAuth} from '../../contexts/AuthContext';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import Spacer from '../Design/Spacer';

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
    const [backgroundColor,setBackgroundColor]=useState('#333333')
    const {signup, addUser} = useAuth();
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('')
    const [loading,setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(()=>{
        if(currentTheme==='dark'){
            setBackgroundColor('#1E1E1E')
        }
        if(currentTheme==='lofi'){
            setBackgroundColor('#300E3F')
        }
    },[currentTheme])

    useEffect(()=>{
        if(success){
            return navigate("/");
        }
    },[success])

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        if(!passwordRef.current || !passwordConfirmRef.current || !emailRef.current){
            return;
        }
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }
        if(!emailRef.current.value){
            return setError('Please enter an email address')
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            await addUser(emailRef.current.value);
        } catch {
            setSuccess('');
            setError('Failed to create an account');
            setLoading(false);
            return;
        }
        setError('');
        setLoading(false);
        setSuccess('Account Created');
    }

    return(
        <div>
            <Paper className="signUp" sx={{backgroundColor:backgroundColor}}>
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange} setCurrentTheme={setCurrentTheme}/>
                <div className="signUpForm">
                    <form onSubmit={handleSubmit}>
                        <Spacer mt={16} mb={16}>
                            <Typography variant="h2" sx={{marginLeft:'5px'}}>Sign Up</Typography>
                        </Spacer>                        
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl>
                                <Spacer mt={16} mb={16}>
                                    <TextField label="Enter Email" inputRef={emailRef}></TextField>
                                </Spacer>                                
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl>
                                <Spacer mt={16} mb={16}>
                                    <TextField label="Create Password" type="password" inputRef={passwordRef}></TextField>
                                </Spacer>                                
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl>
                                <Spacer mt={16} mb={16}>
                                    <TextField label="Confirm Password" type="password" inputRef={passwordConfirmRef}></TextField>
                                </Spacer>                                
                            </FormControl>
                        </FormGroup>
                        <Spacer mt={16} mb={32}>
                            <Button disabled={loading} fullWidth variant="contained" type="submit">Create Account</Button>
                        </Spacer>                        
                    </form>
                </div>
                {error && 
                    <Spacer mt={16}>
                        <Alert color="error">{error}</Alert>
                    </Spacer>}
                {success && 
                    <Spacer mt={16}>
                        <Alert color="success">{success}</Alert>
                    </Spacer>}
            </Paper>
        </div>
    )
}
export default SignUp;