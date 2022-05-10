import './AddButton.css';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, IconButton, Typography } from '@mui/material';
import {useState} from 'react';

function AddButton({numberOfCalcs,setNumberOfCalcs}){

    const handleClick = () => {
        console.log('clicked');
        console.log(numberOfCalcs);
        setNumberOfCalcs([...numberOfCalcs,1]);
    }
    return(
        <div className="addButton">
            <Typography>Add Calculator</Typography>
            <IconButton 
                aria-label="Add Calculator"
                onClick={handleClick}
            >
                <SvgIcon component={AddIcon} fontSize='large'>
                </SvgIcon>
            </IconButton>
        </div>
    )
}

export default AddButton;