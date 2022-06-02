import {Select, MenuItem, InputLabel, FormControl, Button, TextField} from '@mui/material';
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useAuth} from '../../contexts/AuthContext';

function LayoutSelect(){
    const {addLayout} = useAuth();
    const [layout,setLayout] = useState('');
    const [layoutName,setLayoutName] = useState('');
    const [error,setError] = useState('');
    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const globalUser = useSelector(state => state.calcsArray.globalUser);


    const handleChange = (event) =>{
        setLayout(event.target.value)
    }
    const handleClick = () => {
        console.log(calcsArray);
        console.log(layoutName);
        console.log(globalUser);
        //use current user from redux if present
        //use layoutName if not null
        if(!globalUser){
            setError('Please Sign In to Save a Layout')
            console.log('please sign in');
            return;
        }
        if(!layoutName){
            setError('Please Add a Name for the Layout')
            console.log('please add name')
            return;
        }
        addLayout(globalUser, calcsArray, layoutName) 
        //cant add calcsArray =(
        console.log('layout added successfully')
    }
    const handleLayoutNameChange = (event) => {
        setLayoutName(event.target.value);
    }
    return(

        <div>
            <FormControl sx={{minWidth:'100px'}}>
                <InputLabel id='select-label'>Layout</InputLabel>
                <Select
                    label="Layout"
                    labelId='select-label'
                    onChange={handleChange}
                    value={layout}
                >
                    <MenuItem value={'layout1'}>Layout 1</MenuItem>
                    <MenuItem value={'layout2'}>Layout 2</MenuItem>
                    <MenuItem value={'layout3'}>Layout 3</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleClick}>Save as New</Button>
            <TextField 
                value={layoutName}
                label="New Layout Name"
                onChange={handleLayoutNameChange}
            ></TextField>
        </div>
    )
}

export default LayoutSelect;