import './Header.css';
import Button from '@mui/material/Button';
import {useState} from 'react';


function Header(){
    const [user,setUser] = useState(null);

    return(
        <header className="header">
            <a >Logo</a>
            <div id="notLoggedIn">
                <a>Log in</a>
                <Button variant="contained">Sign Up</Button>
            </div>
            <div id="loggedIn">
                <p>Hello, {user}</p>
                <p>(not user 1?)</p>
            </div>
        </header>
    )
}
export default Header;