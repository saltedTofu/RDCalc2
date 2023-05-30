import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography, Paper, Alert, Snackbar } from '@mui/material';
import {useState, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';

interface Props {
    addNewCalc: () => void;
    currentTheme: string;
}

function AddButton({addNewCalc, currentTheme}:Props){
    const [borderColor, setBorderColor] = useState('#0288d1');
    const [error,setError] = useState('');
    const calcsArray = useSelector((state:any) => state.calcsArray.calcsArray);

    useLayoutEffect(()=>{
        if(currentTheme==='dark'){
            setBorderColor('#0288d1') //blue
        }
        else if(currentTheme==='lofi'){
            setBorderColor('#9E6196') //light pink
        }
        else if(currentTheme==='banana'){
            setBorderColor('#212121') //light pink
        }
    },[currentTheme])

    const handleClick = () => {
        if(calcsArray.length>5){
            setError('Too many calculators! The maximum amount is 6.');
        }
        else{
            addNewCalc();
        }
    }

    const handleCloseError = () => {
        setError('');
    }

    return(
        <Paper className="addButton" elevation={5} sx={{border:`1px solid ${borderColor}`}}>
            <Typography variant="body1">Add Calculator</Typography>
            <IconButton 
                aria-label="Add Calculator"
                onClick={handleClick}
                color="primary"
            >
                <SvgIcon component={AddIcon} fontSize='large'>
                </SvgIcon>
            </IconButton>
            
            {error && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={true} autoHideDuration={6000} onClose={handleCloseError}><Alert severity="error"  >{error}</Alert></Snackbar>}
        </Paper>
    )
}

export default AddButton;