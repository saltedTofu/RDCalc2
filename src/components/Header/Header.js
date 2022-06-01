import './Header.css';
import {Button, Paper, Box, TextField, Select, MenuItem, Typography, Alert} from '@mui/material';
import {useState, useLayoutEffect, useRef, useEffect} from 'react';
import Logo from '../../utils/logo.png';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

function Header({currentTheme, handleThemeChange}){

    const {login, currentUser, logout} = useAuth();

    const [user,setUser] = useState('');
    const [iconBackground,setIconBackground] = useState('#0288d1');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    useLayoutEffect(()=>{
        if(currentTheme==='dark'){
            setIconBackground('#0288d1') //blue
        }
        else if(currentTheme==='lofi'){
            setIconBackground('#9E6196') //light pink
        }
    },[currentTheme])

    useEffect(()=>{
        if(currentUser){
            setUser(currentUser.email);
        }
        else{
            setUser('');
        }
    },[currentUser])

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to log in")
        }
        setLoading(false);
    }

    const handleLogout = async () => {
        try{
            await logout(currentUser.auth);
        }catch{
            setError('Failed to log out');
        }
    }

    return(
        <Paper className="header" elevation={5} square={true}>
            <RouterLink to='/'>
                <div id="logoContainer" style={{backgroundColor:iconBackground}}>
                    <img src={Logo} alt="dietitian calc" id='logoImage'/>
                </div>
            </RouterLink>
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                <Typography style={{marginRight:'10px'}}>Theme</Typography>
                <Select
                    onChange={handleThemeChange}
                    value={currentTheme}
                >
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='lofi'>Lofi</MenuItem>
                </Select>
            </div>
            {error && <Alert color="error">{error}</Alert>}

            <Box style={{display: user ? "flex" : "none"}}>
                <Typography variant="p">Hello, {user}</Typography>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </Box>

            <form id="notLoggedIn" onSubmit={handleSubmit} style={{display: user ? "none" : "flex"}}>
                <TextField label="Username" sx={{paddingRight:'5px', paddingLeft:'5px'}} inputRef={emailRef}></TextField>
                <TextField label="Password" sx={{paddingRight:'5px', paddingLeft:'5px'}} inputRef={passwordRef} type="password"></TextField>
                <Button sx={{marginRight:'10px'}} type="submit" disabled={loading}>Log in</Button>
                <RouterLink to='/signup'>
                    <Button variant="contained">Sign Up</Button>
                </RouterLink>
            </form>
            
        </Paper>
    )
}
export default Header;