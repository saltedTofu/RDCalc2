import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography, Paper, Alert } from '@mui/material';
import {useState, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';


function AddButton({addNewCalc, currentTheme}){
    const [borderColor, setBorderColor] = useState('#0288d1');
    const [error,setError] = useState('');
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);

    useLayoutEffect(()=>{
        if(currentTheme==='dark'){
            setBorderColor('#0288d1') //blue
        }
        else if(currentTheme==='lofi'){
            setBorderColor('#9E6196') //light pink
        }
    },[currentTheme])

    const handleClick = () => {
        if(calcsArray.length>5){
            setError('Too Many Calculators!');
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
            <Typography variant="p">Add Calculator</Typography>
            <IconButton 
                aria-label="Add Calculator"
                onClick={handleClick}
                color="primary"
            >
                <SvgIcon component={AddIcon} fontSize='large'>
                </SvgIcon>
            </IconButton>
            {error && <Alert sx={{position:'absolute', left:'28%'}} onClose={handleCloseError}>{error}</Alert>}
        </Paper>
    )
}

export default AddButton;