import { Alert, Snackbar, Checkbox, Paper, FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel, ToggleButton, ToggleButtonGroup, Link, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState, useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Formulas from '../../../../../../utils/TubeFeedFormulas';
import Modulars from '../../../../../../utils/Modulars';
import {useAuth} from '../../../../../../contexts/AuthContext';
import '../../Calculator.css';
import TubeFeedSelect from './TubeFeedSelect/TubeFeedSelect';
import TubeFeedMicros from './TubeFeedMicros/TubeFeedMicros';

function TubeFeed(){
    const [chosenFormula,setChosenFormula] = useState('Compleat');
    const [tubeFeedFavorites,setTubeFeedFavorites] = useState([]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [feedingType,setFeedingType] = useState('continuous');
    const [continuousRate,setContinuousRate] = useState(50);
    const [bolusPerDay,setBolusPerDay] = useState('');
    const [bolusVolume, setBolusVolume] = useState(250);
    const [kcalProvided, setKcalProvided] = useState(0);
    const [proteinProvided, setProteinProvided] = useState(0);
    const [freeWater, setFreeWater] = useState(0);
    const [hrsDay,setHrsDay] = useState('');
    const [bolusKcalProvided, setBolusKcalProvided] = useState(0);
    const [bolusProteinProvided, setBolusProteinProvided] = useState(0);
    const [bolusFreeWater, setBolusFreeWater] = useState(0);
    const [modular,setModular] = useState('none')
    const [modularPerDay,setModularPerDay] = useState('');
    const [flushAmount,setFlushAmount] = useState('');
    const [flushPerDay,setFlushPerDay] = useState('');
    const [error,setError] = useState('');
    const [totalVolume,setTotalVolume] = useState(0)

    //global state from redux
    const globalUser = useSelector(state => state.calcsArray.globalUser);
    const dispatch = useDispatch();

    //query Firebase DB for tube feeding favorites
    const {addTubeFeedFavorite,getTubeFeedFavorites} = useAuth();

    const handleCloseError = () => {
        setError('');
    }

    const handleFormulaChange = (event) => {
        setChosenFormula(event.target.value);
    }
    const handleContinuousRate = (event) => {
        if(event.target.value>100){
            setContinuousRate(100);
        }
        else setContinuousRate(event.target.value);
    }
    const handleHrsDay = (event) => {
        if(event.target.value<1){
            setHrsDay(0);
        }
        else if(event.target.value>24){
            setHrsDay(24);
        } 
        else setHrsDay(event.target.value)
    }
    const handleBolusVolume = (event) => {
        if(event.target.value>1000){
            setBolusVolume(1000)
        }
        else setBolusVolume(event.target.value);
    }
    const handleBolusPerDay = (event) => {
        if(event.target.value<1){
            setBolusPerDay(0);
        }
        else if (event.target.value>24){
            setBolusPerDay(24);
        }
        else setBolusPerDay(event.target.value);
    }
    const handleFeedingType = (event) => {
        setFeedingType(event.target.value);
    }
    const handleModular = (event) => {
        setModular(event.target.value);
    }
    const handleModularPerDay = (event) => {
        if(event.target.value<0){
            setModularPerDay(0);
        }
        else if(event.target.value>99){
            setModularPerDay(99);
        }
        else setModularPerDay(event.target.value);
    }
    const handleFlushAmount = (event) => {
        if(event.target.value<0){
            setFlushAmount(0);
        }
        else if(event.target.value>9999){
            setFlushAmount(9999);
        }
        else setFlushAmount(event.target.value);
    }
    const handleFlushPerDay = (event) => {
        if(event.target.value<0){
            setFlushPerDay(0);
        }
        else if(event.target.value>49){
            setFlushPerDay(49);
        }
        else setFlushPerDay(event.target.value);
    }

    const handleTubeFeedFavorite = async (formula) => {
        if(globalUser){
            const favoritesArray = await addTubeFeedFavorite(globalUser,formula);
            setTubeFeedFavorites(favoritesArray);
        }
        else{
            setError('Please Sign In To Save Favorites')
        }
    }

    const handleShowFavorites = () => {
        if(globalUser){
            setShowOnlyFavorites(!showOnlyFavorites);
        }
        else{
            setError('Please Sign In To Show Favorites')
            //error
        }
    }

    const handleTotalVolume = () => {
        if(feedingType==='continuous'){
            setTotalVolume(continuousRate*hrsDay)
        }
        else{
            setTotalVolume(bolusPerDay*bolusVolume)
        }
    }

    useEffect(()=>{
        const setFavoritesOnInitialRender = async () => {
            if(globalUser){
                const favoritesArray = await getTubeFeedFavorites(globalUser)
                setTubeFeedFavorites(favoritesArray);
            }
        }
        setFavoritesOnInitialRender();
        
    },[])
    
    useEffect(()=>{
        handleTotalVolume();
    },[feedingType])

    useEffect(()=>{
        if(!globalUser){
            setShowOnlyFavorites(false);
        }
        const setFavoritesOnUserChange = async () => {
            if(globalUser){
                const favoritesArray = await getTubeFeedFavorites(globalUser)
                setTubeFeedFavorites(favoritesArray);
            }
            else{
                setTubeFeedFavorites([])
            }
        }
        setFavoritesOnUserChange();
        
    },[globalUser])

    //Continuous
    useEffect(()=>{ 
        const formulaToUse = Formulas[chosenFormula];
        if(!formulaToUse){
            return;
        }
        let modularKcal=0;
        let modularProtein=0;
        if(modular!=='none'){
            const chosenModular = Modulars[modular];
            modularKcal=chosenModular.kcal * modularPerDay;
            modularProtein=chosenModular.protein * modularPerDay;
        }
        let flush=0;
        if(flushAmount){
            //handle flush amount
            flush=flushAmount * flushPerDay;
        }
        setKcalProvided(Math.round(modularKcal + formulaToUse.kcal/1000 * continuousRate * hrsDay));
        setProteinProvided(Math.round(modularProtein + formulaToUse.protein/1000 * continuousRate * hrsDay));
        setFreeWater(Math.round(flush + formulaToUse.water/1000 * continuousRate * hrsDay));
        handleTotalVolume();
    },[chosenFormula,continuousRate,hrsDay,modular,modularPerDay,flushAmount,flushPerDay])
    
    //Bolus
    useEffect(()=>{
        const formulaToUse = Formulas[chosenFormula];
        if(!formulaToUse){
            return;
        }
        let modularKcal=0;
        let modularProtein=0;
        if(modular!=='none'){
            const chosenModular = Modulars[modular];
            modularKcal=chosenModular.kcal * modularPerDay;
            modularProtein=chosenModular.protein * modularPerDay;
        }
        let flush=0;
        if(flushAmount){
            //handle flush amount
            flush=flushAmount * flushPerDay;
        }
        setBolusKcalProvided(Math.round(modularKcal + formulaToUse.kcal/1000 * bolusPerDay * bolusVolume));
        setBolusProteinProvided(Math.round(modularProtein + formulaToUse.protein/1000 * bolusPerDay * bolusVolume));
        setBolusFreeWater(Math.round(flush + formulaToUse.water/1000 * bolusPerDay * bolusVolume));
        handleTotalVolume();
    },[bolusPerDay,bolusVolume,chosenFormula,modular,modularPerDay,flushAmount,flushPerDay])

    return(
        <div className='tubeFeedCalc'>
            <FormControl sx={{marginBottom:'15px', display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}} >
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', marginBottom:'10px'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', marginBottom:'5px'}}>
                        <Checkbox
                            label="Favorites Only"
                            checked={showOnlyFavorites}
                            onChange={handleShowFavorites}
                        />
                        <Typography variant="p">Show Favorites Only</Typography>
                    </div>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                        <TubeFeedSelect 
                            chosenFormula={chosenFormula}
                            handleFormulaChange={handleFormulaChange}
                            showOnlyFavorites={showOnlyFavorites}
                            Formulas={Formulas}
                            tubeFeedFavorites={tubeFeedFavorites}
                        />
                        
                    </div>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%'}}>
                        <IconButton onClick={function updateFavorites(){handleTubeFeedFavorite(Formulas[chosenFormula].name)}}>
                            <FavoriteIcon color="primary" sx={tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'block'} : {display:'none'}}/>
                            <FavoriteBorderIcon color="primary" sx={tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'none'} : {display:'block'}}/>
                        </IconButton>
                        <Typography sx={tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'none'} : {display:'block'}}>Add to Favorites</Typography>
                        <Typography sx={tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'block'} : {display:'none'}}>Remove from Favorites</Typography>
                    </div>
                
                    
                </div>
                
                <ToggleButtonGroup 
                    size="large" 
                    aria-label="Choose feeding type"
                    exclusive
                    onChange={handleFeedingType}
                    value={feedingType}
                >
                    <ToggleButton value='continuous'>Continuous</ToggleButton>
                    <ToggleButton value='bolus'>Bolus</ToggleButton>
                </ToggleButtonGroup>
            </FormControl>

            <div 
                style={
                    feedingType==='continuous'
                        ? {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}
                        : {display:'none'}
                    }
            >
                <Slider
                    aria-label="Continous Rate"
                    defaultValue={50}
                    value={continuousRate}
                    onChange={handleContinuousRate}
                    min={5}
                    max={100}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{width:'100%',marginBottom:'15px'}}
                ></Slider>
                <div>
                    <TextField sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} value={continuousRate} type="number" onChange={handleContinuousRate} label="ml/hr"></TextField>
                    <TextField 
                        type="number" 
                        label="hrs/day"
                        labelid="continuous-hrs-label"
                        value={hrsDay}
                        onChange={handleHrsDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <FormControl sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center',marginBottom:'20px', marginTop:'8px'}}>
                    <InputLabel id="modular-label">Modular</InputLabel>
                    <Select
                        labelid='modular-label'
                        label="Modular"
                        value={modular}
                        onChange={handleModular}
                        sx={{width:'175px',marginRight:'15px'}}
                        MenuProps={{sx:{height:'600px'}}}
                    >
                        <MenuItem value={'none'} key={'none'}>None</MenuItem>
                        {Object.entries(Modulars).map(([key]) => <MenuItem key={key} value={key}>{Modulars[key].name}</MenuItem>)}
                    </Select>
                    <TextField
                        sx={{width:'100px',marginRight:'10px'}}
                        type="number"
                        label="times/day"
                        value={modularPerDay}
                        onChange={handleModularPerDay}
                    ></TextField>
                </FormControl>
                <FormControl sx={{display:'flex',flexDirection:'row', marginBottom:'20px'}}>
                    <TextField
                        type="number"
                        label="Water Flush Volume (mL)"
                        sx={{marginRight:'10px'}}
                        value={flushAmount}
                        onChange={handleFlushAmount}
                    ></TextField>
                    <TextField
                        sx={{width:'100px'}}
                        type="number"
                        label="flushes/day"
                        value={flushPerDay}
                        onChange={handleFlushPerDay}
                    ></TextField>
                </FormControl>
                <Paper className="tubeFeedOutput" sx={{marginBottom:'20px'}}>
                    <Typography variant="h6">{kcalProvided} Kcal</Typography>
                    <Typography variant="h6">{proteinProvided}g Protein</Typography>
                    <Typography variant="h6">{freeWater}ml Free Water</Typography>
                </Paper>
                <TubeFeedMicros 
                        chosenFormula={chosenFormula}
                        totalVolume={totalVolume}
                        modular={modular}
                        modularPerDay={modularPerDay}
                        Formulas={Formulas}
                />
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', width:'100%', paddingBottom:'10px'}}>
                    <Link target="_blank" 
                        sx={
                            chosenFormula
                            ? {display:'flex'}
                            : {display:'none'}
                        }
                        href={
                            chosenFormula
                                ? Formulas[chosenFormula].reference
                                : ''
                        }
                    >
                        Tube Feed Reference
                    </Link>
                    <Link  target="_blank" 
                        sx={
                            modular!=='none'
                            ? {display:'flex'}
                            : {display:'none'}
                        }
                        href={
                            modular!=='none'
                                ? Modulars[modular].reference
                                : ''
                        }
                    >
                        Modular Reference
                    </Link>
                </div>
            </div>

            <div 
                style={
                    feedingType==='bolus'
                        ? {display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}
                        : {display:'none'}
                    }
            >
                <Slider
                    aria-label="Bolus Volume"
                    defaultValue={250}
                    value={bolusVolume}
                    onChange={handleBolusVolume}
                    min={100}
                    max={500}
                    step={1}
                    valueLabelDisplay="auto"
                    sx={{width:'100%',marginBottom:'15px'}}
                ></Slider>
                <div>
                    <TextField sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} value={bolusVolume} type="number" onChange={handleBolusVolume} label="ml"></TextField>
                    <TextField 
                        type="number" 
                        label="bolus/day"
                        labelid="continuous-hrs-label"
                        value={bolusPerDay}
                        onChange={handleBolusPerDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <FormControl sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center',marginBottom:'20px', marginTop:'8px'}}>
                    <InputLabel id="modular-label">Modular</InputLabel>
                    <Select
                        labelid='modular-label'
                        label="Modular"
                        value={modular}
                        onChange={handleModular}
                        sx={{width:'175px',marginRight:'15px'}}
                        MenuProps={{sx:{height:'600px'}}}
                    >
                        <MenuItem value={'none'} key="none">None</MenuItem>
                        {Object.entries(Modulars).map(([key]) => <MenuItem value={key} key={key}>{Modulars[key].name}</MenuItem>)}
                    </Select>
                    <TextField
                        sx={{width:'100px',marginRight:'10px'}}
                        type="number"
                        label="times/day"
                        value={modularPerDay}
                        onChange={handleModularPerDay}
                    ></TextField>
                    
                </FormControl>
                <FormControl sx={{display:'flex',flexDirection:'row', marginBottom:'20px'}}>
                    <TextField
                        type="number"
                        label="Water Flush Volume (mL)"
                        sx={{marginRight:'10px'}}
                        value={flushAmount}
                        onChange={handleFlushAmount}
                    ></TextField>
                    <TextField
                        sx={{width:'100px'}}
                        type="number"
                        label="flushes/day"
                        value={flushPerDay}
                        onChange={handleFlushPerDay}
                    ></TextField>
                </FormControl>
                <Paper className="tubeFeedOutput" sx={{marginBottom:'20px'}}>
                    <Typography variant="h6">{bolusKcalProvided} Kcal</Typography>
                    <Typography variant="h6">{bolusProteinProvided}g Protein</Typography>
                    <Typography variant="h6">{bolusFreeWater}ml Free Water</Typography>
                </Paper>
                <TubeFeedMicros 
                        chosenFormula={chosenFormula}
                        totalVolume={totalVolume}
                        modular={modular}
                        modularPerDay={modularPerDay}
                        Formulas={Formulas}
                        
                />
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around', width:'100%', paddingBottom:'10px'}}>
                    <Link target="_blank" 
                        sx={
                            chosenFormula
                            ? {display:'flex'}
                            : {display:'none'}
                        }
                        href={
                            chosenFormula
                                ? Formulas[chosenFormula].reference
                                : ''
                        }
                    >
                        Tube Feed Reference
                    </Link>
                    <Link  target="_blank" 
                        sx={
                            modular!=='none'
                            ? {display:'flex'}
                            : {display:'none'}
                        }
                        href={
                            modular!=='none'
                                ? Modulars[modular].reference
                                : ''
                        }
                    >
                        Modular Reference
                    </Link>
                </div>
            </div>
            {error && <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={true} onClose={handleCloseError} autoHideDuration={6000}><Alert severity='error'>{error}</Alert></Snackbar>}
        </div>
    )
}
export default TubeFeed;