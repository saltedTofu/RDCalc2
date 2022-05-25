import './Header.css';
import {Button, Paper, Box, TextField, Link, Select, MenuItem, Typography} from '@mui/material';
import {useState, useEffect, useRef} from 'react';
import Logo from '../../utils/logo.png';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';

function Header({noLogin=false, currentTheme, handleThemeChange}){
    const [user,setUser] = useState(null);
    const [show, setShow] = useState(true);
    const [iconBackground,setIconBackground] = useState('dark')

    useEffect(()=>{
        if(noLogin===true){
            setShow(false);
        }
    },[])
    useEffect(()=>{
        if(currentTheme==='dark'){
            setIconBackground('#0288d1') //blue
        }
        else if(currentTheme==='lofi'){
            setIconBackground('#9E6196') //light pink
        }
    },[currentTheme])

    return(
        <Paper className="header" elevation={5} square={true}>
            <RouterLink to='/'>
                <div id="logoContainer" style={{backgroundColor:iconBackground}}>
                    <img src={Logo} alt="dietitian calc" id='logoImage'/>
                </div>
            </RouterLink>
            <div style={{display: show ? 'flex' : "none", flexDirection:'row', alignItems:'center'}}>
                <Typography style={{marginRight:'10px'}}>Theme</Typography>
                <Select
                    onChange={handleThemeChange}
                    value={currentTheme}
                >
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='lofi'>Lofi</MenuItem>
                </Select>
            </div>
            <Box id="notLoggedIn" component="div" style={{display: show ? "flex" : "none"}}>
                <TextField label="Username" sx={{paddingRight:'5px', paddingLeft:'5px'}}></TextField>
                <TextField label="Password" sx={{paddingRight:'5px', paddingLeft:'5px'}} type="password"></TextField>
                <Link sx={{marginRight:'10px'}}>Log in</Link>
                <RouterLink to='/signup'>
                    <Button variant="contained">Sign Up</Button>
                </RouterLink>
            </Box>
            <Box id="loggedIn">
                <p>Hello, {user}</p>
                <p>(not user 1?)</p>
            </Box>
        </Paper>
    )
}
export default Header;