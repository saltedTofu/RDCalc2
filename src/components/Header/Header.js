import './Header.css';
import {Button, Paper, Box, TextField, Select, MenuItem, Typography, Alert} from '@mui/material';
import {useState, useLayoutEffect, useRef, useEffect} from 'react';
import Logo from '../../utils/logo.png';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { setGlobalUser } from '../../redux/calcs';
import {useAuth} from '../../contexts/AuthContext';
import Coffee from '../../utils/buyMeCoffee.png';

function Header({currentTheme, handleThemeChange, setCurrentTheme}){

    const {login, currentUser, logout, getTheme} = useAuth();

    //global state from redux
    const dispatch = useDispatch();

    //local state
    const [user,setUser] = useState('');
    const [iconBackground,setIconBackground] = useState('#0288d1');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(()=>{
        async function grabTheme(){
            if(user){
                let savedTheme = await getTheme(user);
                await setCurrentTheme(savedTheme)
            }
        }
        grabTheme()
    },[user,getTheme,setCurrentTheme])

    useEffect(()=>{
        dispatch(setGlobalUser(user));
    },[user,dispatch])

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

    const handleLogin = async(event) => {
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
            setLoading(true)
            setUser('');
            await logout(currentUser.auth);
            
        }catch{
            setError('Failed to log out');
        }
        setLoading(false);
    }

    return(
        <Paper className="header" elevation={5} square={true}>
            <RouterLink to='/'>
                <div id="logoContainer" style={{backgroundColor:iconBackground}}>
                    <img src={Logo} alt="dietitian calc" id='logoImage'/>
                </div>
            </RouterLink>
            
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', position:'absolute', left:'100px'}}>
                <Typography style={{marginRight:'10px'}}>Theme</Typography>
                <Select
                    onChange={handleThemeChange}
                    value={currentTheme}
                >
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='lofi'>Lofi</MenuItem>
                </Select>
            </div>

            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', position:'absolute'}} id="donateDiv">
                <a href="https://www.buymeacoffee.com/saltedTofu" target="_blank" rel="noreferrer"><img src={Coffee} width="160px" alt="Donate Button" id="donateButton"></img></a>
            </div>
            
            <div className="loginFields">
                <Box style={{display: user ? "flex" : "none", alignItems:'center',justifyContent:'center'}}>
                    <Typography variant="p">Hello, {user}</Typography>
                    <Button variant="contained" onClick={handleLogout} sx={{margin:'10px'}} disabled={loading}>Logout</Button>
                </Box>
                <form id="notLoggedIn" onSubmit={handleLogin} style={{display: user ? "none" : "flex", alignItems:'center',justifyContent:'center'}}>
                    {error && <Alert color="error">{error}</Alert>}
                    <TextField className="autofillColor" label="Username" sx={{paddingRight:'5px', paddingLeft:'5px'}} inputRef={emailRef}></TextField>
                    <TextField className="autofillColor" label="Password" sx={{paddingRight:'5px', paddingLeft:'5px'}} inputRef={passwordRef} type="password"></TextField>
                    <Button sx={{marginLeft:'10px'}} type="submit" disabled={loading} >Log in</Button>
                    <RouterLink to='/signup'>
                        <Button variant="contained" sx={{margin:'10px'}} disabled={loading}>Sign Up</Button>
                    </RouterLink>
                </form>
            </div>
        </Paper>
    )
}
export default Header;