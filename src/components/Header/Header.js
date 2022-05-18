import './Header.css';
import {Button, Paper, Link, Box, TextField} from '@mui/material';
import {useState} from 'react';
import Logo from '../../utils/logo.png';


function Header(){
    const [user,setUser] = useState(null);

    return(
        <Paper className="header" elevation={5} square={true}>
            <img src={Logo} alt="dietitian calc" id='logoImage'/>
            <Box id="notLoggedIn" component="div">
                <TextField label="Username" sx={{paddingRight:'5px', paddingLeft:'5px'}}></TextField>
                <TextField label="Password" sx={{paddingRight:'5px', paddingLeft:'5px'}} type="password"></TextField>
                <Link sx={{marginRight:'10px'}}>Log in</Link>
                <Button variant="contained">Sign Up</Button>
            </Box>
            <Box id="loggedIn">
                <p>Hello, {user}</p>
                <p>(not user 1?)</p>
            </Box>
        </Paper>
    )
}
export default Header;