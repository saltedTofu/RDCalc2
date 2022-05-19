import {Paper, Typography, TextField, Button} from '@mui/material';
import Header from '../Header/Header';
import './SignUp.css';

function SignUp(){
    return(
        <Paper component="div" className="signUp">
            <Header noLogin={true}/>
            <Paper elevation={5} className="signUpForm">
                <Typography variant="h2" sx={{margin:'20px'}}>Sign Up</Typography>
                <TextField label="Create Username" sx={{marginTop:'20px', marginBottom:'20px'}}></TextField>
                <TextField label="Create Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password"></TextField>
                <TextField label="Confirm Password" sx={{marginTop:'20px', marginBottom:'20px'}} type="password"></TextField>
                <Button variant="contained" sx={{margin:'20px'}}>Sign Up</Button>
            </Paper>
        </Paper>
    )
}
export default SignUp;