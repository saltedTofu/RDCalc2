import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography, Paper } from '@mui/material';
import {useState, useLayoutEffect} from 'react';


function AddButton({addNewCalc, currentTheme}){
    const [borderColor, setBorderColor] = useState('#0288d1');

    useLayoutEffect(()=>{
        if(currentTheme==='dark'){
            setBorderColor('#0288d1') //blue
        }
        else if(currentTheme==='lofi'){
            setBorderColor('#9E6196') //light pink
        }
    },[currentTheme])

    const handleClick = () => {
        addNewCalc();
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
        </Paper>
    )
}

export default AddButton;