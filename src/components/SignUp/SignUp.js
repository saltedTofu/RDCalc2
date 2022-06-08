import {Paper, Typography, TextField, Button, FormControl, FormGroup, Alert} from '@mui/material';
import {useRef, useState} from 'react'
import Header from '../Header/Header';
import {useAuth} from '../../contexts/AuthContext';
import './SignUp.css';



function SignUp({currentTheme,handleThemeChange}){

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, addUser} = useAuth();
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('')
    const [loading,setLoading] = useState(false);

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
            <Paper component="div" className="signUp">     
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange}/>
                <Paper elevation={5} className="signUpForm">
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h2" sx={{margin:'20px'}}>Sign Up</Typography>
                        <FormGroup sx={{width:'90%'}}>
                            <FormControl><TextField label="Enter Email" sx={{marginTop:'20px', marginBottom:'20px'}} inputRef={emailRef}></TextField></FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'90%'}}>
                            <FormControl><TextField label="Create Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password" inputRef={passwordRef}></TextField></FormControl>
                        </FormGroup>
                        <FormGroup sx={{width:'90%'}}>
                            <FormControl><TextField label="Confirm Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password" inputRef={passwordConfirmRef}></TextField></FormControl>
                        </FormGroup>
                        <Button disabled={loading} fullWidth variant="contained" sx={{margin:'20px'}} type="submit">Sign Up</Button>
                    </form>
                </Paper>
                {error && <Alert color="error">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
            </Paper>
        </div>
    )
}
export default SignUp;