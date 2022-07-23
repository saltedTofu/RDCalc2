import {Paper, Typography, TextField, Button, FormControl, FormGroup, Alert} from '@mui/material';
import {useRef, useState, useEffect} from 'react'
import Header from '../Header/Header';
import {useAuth} from '../../contexts/AuthContext';
import './SignUp.css';
import { useNavigate } from "react-router-dom";





function SignUp({currentTheme,handleThemeChange}){

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, addUser} = useAuth();
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('')
    const [loading,setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(()=>{
        if(success){
            return navigate("/");
        }
    },[success])

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            <Paper square component="div" className="signUp">     
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange}/>
                <Paper elevation={5} className="signUpForm">
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h2" sx={{marginTop:'20px', marginBottom:'20px', marginLeft:'5px'}}>Sign Up</Typography>
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl><TextField label="Enter Email" sx={{marginTop:'20px', marginBottom:'20px'}} inputRef={emailRef}></TextField></FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl><TextField label="Create Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password" inputRef={passwordRef}></TextField></FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'100%'}}>
                            <FormControl><TextField label="Confirm Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password" inputRef={passwordConfirmRef}></TextField></FormControl>
                        </FormGroup>
                        <Button disabled={loading} fullWidth variant="contained" sx={{marginTop:'20px', marginBottom:'30px'}} type="submit">Create Account</Button>
                    </form>
                </Paper>
                {error && <Alert sx={{marginTop:'15px'}} color="error">{error}</Alert>}
                {success && <Alert sx={{marginTop:'15px'}} color="success">{success}</Alert>}
            </Paper>
        </div>
    )
}
export default SignUp;