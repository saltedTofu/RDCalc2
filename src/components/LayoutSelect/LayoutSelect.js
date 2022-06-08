import {Select, MenuItem, InputLabel, FormControl, Button, TextField, Alert} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setCalcsArray } from '../../redux/calcs';
import {useAuth} from '../../contexts/AuthContext';
import './LayoutSelect.css';

function LayoutSelect(){
    const {addLayout, getLayouts, deleteLayout} = useAuth();
    const [layout,setLayout] = useState('');
    const [layoutArray,setLayoutArray]=useState([]);
    const [layoutName,setLayoutName] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const calcNamesArray = useSelector(state => state.calcsArray.calcNamesArray);
    const globalUser = useSelector(state => state.calcsArray.globalUser);

    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchLayouts = async()=>{
            if(globalUser){
                const layouts = await getLayouts(globalUser);
                setLayoutArray(layouts);
            }
            else{
                setLayoutArray([]);
            }
        }
        fetchLayouts();
    },[globalUser,getLayouts])

    useEffect(()=>{
        if(layoutArray.length<1){
            dispatch(setCalcsArray([]));
        }
        else if(layout){
            dispatch(setCalcsArray(layoutArray[layout]));
        }
    },[layout,dispatch,layoutArray])

    const handleLayoutChange = (event) =>{
        setLayout(event.target.value)
    }

    const handleNewLayout = async() => {
        if(!globalUser){
            setError('Please Sign In to Save a Layout');
            setSuccess('');
            return;
        }
        if(!layoutName){
            setError('Please Add a Name for the Layout');
            setSuccess('');
            return;
        }
        try{
            await addLayout(globalUser, calcNamesArray, layoutName);
        }
        catch{
            setError('Unable to Add Layout: Server Error');
            setSuccess('');
        }
        setSuccess('Layout Created');
        setError('');
        
        const fetchLayouts = async()=>{
            if(globalUser){
                const layouts = await getLayouts(globalUser);
                setLayoutArray(layouts);
            }
            else{
                setLayoutArray([]);
            }
        }
        setTimeout(()=>{ //in order for database to catchup, otherwise a refresh is needed for new layout to appear in the select
            fetchLayouts();
        },1000)
        
    }

    const handleLayoutNameChange = (event) => {
        setLayoutName(event.target.value);
    }

    const handleDelete = () => {
        setLayout('');
        deleteLayout(globalUser, layout);
        const fetchLayouts = async()=>{
            if(globalUser){
                const layouts = await getLayouts(globalUser);
                setLayoutArray(layouts);
            }
            else{
                setLayoutArray([]);
            }
        }
        setTimeout(()=>{ //in order for database to catchup, otherwise a refresh is needed for deleted layout to disappear
            fetchLayouts();
        },1000)
    }

    const handleCloseSuccess = () => {
        setSuccess('');
    }

    const handleCloseError = () => {
        setError('');
    }

    return(
        <div className="layoutSelect">
            <FormControl sx={{minWidth:'100px', marginLeft:'15px'}}>
                <InputLabel id='select-label'>Layout</InputLabel>
                <Select
                    label="Layout"
                    labelId='select-label'
                    onChange={handleLayoutChange}
                    value={layout}
                >
                    {Object.keys(layoutArray).map((choice)=><MenuItem value={choice}>{choice}</MenuItem>)}
                </Select>  
                <Button onClick={handleDelete}>Delete This Layout<DeleteIcon /></Button>
            </FormControl>
            <div style={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
                <TextField 
                    value={layoutName}
                    label="New Layout Name"
                    onChange={handleLayoutNameChange}
                ></TextField>   
                <Button onClick={handleNewLayout}>Save as New Layout<AddBoxIcon /></Button>
            </div>
            {error && <Alert color="error" onClose={handleCloseError} sx={{position:'absolute', right:'25%'}}>{error}</Alert>}
            {success && <Alert color="success" onClose={handleCloseSuccess} sx={{position:'absolute', right:'30%'}}>{success}</Alert>}
        </div>
    )
}

export default LayoutSelect;