import {Typography, Slider, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import {useState, useEffect} from 'react';

function Notes(){
    const styles={
        width:'100%',
        height:'100%'
    }
    return(
        <div style={styles}>
            <TextField
                fullWidth
                multiline
                minRows={15}
            ></TextField>
        </div>
    )
}

export default Notes;