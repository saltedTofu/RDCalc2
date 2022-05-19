import './Header.css';
import {Button, Paper, Box, TextField, Link} from '@mui/material';
import {useState, useEffect, useRef} from 'react';
import Logo from '../../utils/logo.png';
import {BrowserRouter as Router, Routes, Route, Link as RouterLink} from 'react-router-dom';

function Header({noLogin=false}){
    const [user,setUser] = useState(null);
    const [show, setShow] = useState(true);

    useEffect(()=>{
        if(noLogin===true){
            setShow(false);
        }
    },[])

    return(
        <Paper className="header" elevation={5} square={true}>
            <RouterLink to='/'>
                <img src={Logo} alt="dietitian calc" id='logoImage'/>
            </RouterLink>
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