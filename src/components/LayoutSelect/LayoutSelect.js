import {Select, MenuItem, InputLabel, FormControl, Button, TextField} from '@mui/material';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setCalcsArray } from '../../redux/calcs';
import {useAuth} from '../../contexts/AuthContext';

function LayoutSelect(){
    const {addLayout, getLayouts} = useAuth();
    const [layout,setLayout] = useState('');
    const [layoutArray,setLayoutArray]=useState([]);
    const [layoutName,setLayoutName] = useState('');
    const [error,setError] = useState('');

    const calcsArray = useSelector(state => state.calcsArray.calcsArray);
    const calcNamesArray = useSelector(state => state.calcsArray.calcNamesArray);
    const globalUser = useSelector(state => state.calcsArray.globalUser);

    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchLayouts = async()=>{
            const layouts = await getLayouts(globalUser);
            setLayoutArray(layouts);
        }
        fetchLayouts();
    },[globalUser,getLayouts])

    useEffect(()=>{
        if(layoutArray && layout){
            dispatch(setCalcsArray(layoutArray[layout]));
        }
    },[layout,dispatch,layoutArray])

    const handleLayoutChange = (event) =>{
        setLayout(event.target.value)
    }

    const handleClick = () => {
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
        addLayout(globalUser, calcNamesArray, layoutName) 
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
                    onChange={handleLayoutChange}
                    value={layout}
                >
                    {Object.keys(layoutArray).map((choice)=><MenuItem value={choice}>{choice}</MenuItem>)}
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