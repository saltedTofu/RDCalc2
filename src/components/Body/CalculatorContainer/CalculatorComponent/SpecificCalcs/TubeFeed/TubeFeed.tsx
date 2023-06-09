import { Alert, Snackbar, Checkbox, Paper, FormControl, Typography, Slider, Select, MenuItem, TextField, InputLabel, ToggleButton, ToggleButtonGroup, Link, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Formulas, FormulasType} from '../../../../../../assets/TubeFeedFormulas';
import {Modulars, ModularsType} from '../../../../../../assets/Modulars';
import {useAuth} from '../../../../../../contexts/AuthContext';
import '../../Calculator.css';
import TubeFeedSelect from './TubeFeedSelect/TubeFeedSelect';
import TubeFeedMicros from './TubeFeedMicros/TubeFeedMicros';
import { wholeNumberInputValidation } from '../../../../../../utils/wholeNumberInputValidation';
import { decimalInputValidation } from '../../../../../../utils/decimalInputValidation';

function TubeFeed(){
    const [chosenFormula,setChosenFormula] = useState<FormulasType>('Compleat');
    const [tubeFeedFavorites,setTubeFeedFavorites] = useState<string[]>([]);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [feedingType,setFeedingType] = useState('continuous');
    const [continuousRate,setContinuousRate] = useState("50");
    const [bolusPerDay,setBolusPerDay] = useState("");
    const [bolusVolume, setBolusVolume] = useState("250");
    const [kcalProvided, setKcalProvided] = useState(0);
    const [proteinProvided, setProteinProvided] = useState(0);
    const [freeWater, setFreeWater] = useState(0);
    const [hrsDay,setHrsDay] = useState("");
    const [bolusKcalProvided, setBolusKcalProvided] = useState(0);
    const [bolusProteinProvided, setBolusProteinProvided] = useState(0);
    const [bolusFreeWater, setBolusFreeWater] = useState(0);
    const [modular,setModular] = useState<ModularsType>('none')
    const [modularPerDay,setModularPerDay] = useState("");
    const [flushAmount,setFlushAmount] = useState("");
    const [flushPerDay,setFlushPerDay] = useState("");
    const [error,setError] = useState('');
    const [totalVolume,setTotalVolume] = useState(0)

    //global state from redux
    const globalUser = useSelector((state:any) => state.calcsArray.globalUser);

    //query Firebase DB for tube feeding favorites
    const {addTubeFeedFavorite,getTubeFeedFavorites} = useAuth();

    const handleCloseError = () => {
        setError('');
    }

    const handleFormulaChange = (event:any) => {
        setChosenFormula(event.target.value);
    }
    const handleContinuousRate = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 3, 999)
        setContinuousRate(validatedString);
    }
    const handleHrsDay = (event:any) => {
        const validatedString = decimalInputValidation(event.target.value, 5, 24)
        setHrsDay(validatedString)
    }
    const handleBolusVolume = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 4, 999)
        setBolusVolume(validatedString);
    }
    const handleBolusPerDay = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 2, 24)
        setBolusPerDay(validatedString);
    }
    const handleFeedingType = (event:any) => {
        setFeedingType(event.target.value);
    }
    const handleModular = (event:any) => {
        setModular(event.target.value);
    }
    const handleModularPerDay = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 2, 99)
        setModularPerDay(validatedString);
    }
    const handleFlushAmount = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 4, 9999)
        setFlushAmount(validatedString);
    }
    const handleFlushPerDay = (event:any) => {
        const validatedString = wholeNumberInputValidation(event.target.value, 2, 99)
        setFlushPerDay(validatedString);
    }

    const handleTubeFeedFavorite = async (formula:string) => {
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
            setTotalVolume(Number(continuousRate)*Number(hrsDay))
        }
        else{
            setTotalVolume(Number(bolusPerDay)*Number(bolusVolume))
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
            modularKcal=chosenModular.kcal * Number(modularPerDay);
            modularProtein=chosenModular.protein * Number(modularPerDay);
        }
        let flush=0;
        if(flushAmount){
            //handle flush amount
            flush=Number(flushAmount) * Number(flushPerDay);
        }
        setKcalProvided(Math.round(modularKcal + formulaToUse.kcal/1000 * Number(continuousRate) * Number(hrsDay)));
        setProteinProvided(Math.round(modularProtein + formulaToUse.protein/1000 * Number(continuousRate) * Number(hrsDay)));
        setFreeWater(Math.round(flush + formulaToUse.water/1000 * Number(continuousRate) * Number(hrsDay)));
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
            modularKcal=chosenModular.kcal * Number(modularPerDay);
            modularProtein=chosenModular.protein * Number(modularPerDay);
        }
        let flush=0;
        if(flushAmount){
            //handle flush amount
            flush=Number(flushAmount) * Number(flushPerDay);
        }
        setBolusKcalProvided(Math.round(modularKcal + formulaToUse.kcal/1000 * Number(bolusPerDay) * Number(bolusVolume)));
        setBolusProteinProvided(Math.round(modularProtein + formulaToUse.protein/1000 * Number(bolusPerDay) * Number(bolusVolume)));
        setBolusFreeWater(Math.round(flush + formulaToUse.water/1000 * Number(bolusPerDay) * Number(bolusVolume)));
        handleTotalVolume();
    },[bolusPerDay,bolusVolume,chosenFormula,modular,modularPerDay,flushAmount,flushPerDay])

    return(
        <div className='tubeFeedCalc'>
            <FormControl sx={{marginBottom:'15px', display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}} >
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', marginBottom:'10px'}}>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', marginBottom:'5px'}}>
                        <Checkbox
                            checked={showOnlyFavorites}
                            onChange={handleShowFavorites}
                        />
                        <Typography>Show Favorites Only</Typography>
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
                            <FavoriteIcon color="primary" sx={tubeFeedFavorites && tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'block'} : {display:'none'}}/>
                            <FavoriteBorderIcon color="primary" sx={tubeFeedFavorites && tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'none'} : {display:'block'}}/>
                        </IconButton>
                        <Typography sx={tubeFeedFavorites && tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'none'} : {display:'block'}}>Add to Favorites</Typography>
                        <Typography sx={tubeFeedFavorites && tubeFeedFavorites.includes(Formulas[chosenFormula].name) ? {display:'block'} : {display:'none'}}>Remove from Favorites</Typography>
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
                <div>
                    <TextField 
                        sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} 
                        value={continuousRate} 
                        type="string" 
                        onChange={handleContinuousRate} 
                        label="ml/hr"
                        autoComplete='off'
                    > 
                    </TextField>
                    <TextField
                        autoComplete='off'
                        type="string" 
                        label="hrs/day"
                        value={hrsDay}
                        onChange={handleHrsDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <FormControl sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center',marginBottom:'20px', marginTop:'8px'}}>
                    <InputLabel id="modular-label">Modular</InputLabel>
                    <Select
                        label="Modular"
                        value={modular}
                        onChange={handleModular}
                        sx={{width:'175px',marginRight:'15px'}}
                        MenuProps={{sx:{height:'600px'}}}
                    >
                        <MenuItem value={'none'} key={'none'}>None</MenuItem>
                        {Object.entries(Modulars).map(([key]) => <MenuItem key={key} value={key}>{(Modulars as any)[key].name}</MenuItem>)}
                    </Select>
                    <TextField
                        autoComplete='off'
                        sx={{width:'100px',marginRight:'10px'}}
                        type="string"
                        label="times/day"
                        value={modularPerDay}
                        onChange={handleModularPerDay}
                    ></TextField>
                </FormControl>
                <FormControl sx={{display:'flex',flexDirection:'row', marginBottom:'20px'}}>
                    <TextField
                        autoComplete='off'
                        type="string"
                        label="Water Flush Volume (mL)"
                        sx={{marginRight:'10px'}}
                        value={flushAmount}
                        onChange={handleFlushAmount}
                    ></TextField>
                    <TextField
                        autoComplete='off'
                        sx={{width:'100px'}}
                        type="numstringber"
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
                <div>
                    <TextField 
                        sx={{marginBottom:'15px', width:'100px', marginRight:'15px'}} 
                        autoComplete='off'
                        value={bolusVolume} 
                        type="string" 
                        onChange={handleBolusVolume} 
                        label="ml"></TextField>
                    <TextField 
                        autoComplete='off'
                        type="string" 
                        label="bolus/day"
                        value={bolusPerDay}
                        onChange={handleBolusPerDay}
                        sx={{width:'100px'}}
                    ></TextField>
                </div>
                <FormControl sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center',marginBottom:'20px', marginTop:'8px'}}>
                    <InputLabel id="modular-label">Modular</InputLabel>
                    <Select
                        label="Modular"
                        value={modular}
                        onChange={handleModular}
                        sx={{width:'175px',marginRight:'15px'}}
                        MenuProps={{sx:{height:'600px'}}}
                    >
                        <MenuItem value={'none'} key="none">None</MenuItem>
                        {Object.entries(Modulars).map(([key]) => <MenuItem value={key} key={key}>{(Modulars as any)[key].name}</MenuItem>)}
                    </Select>
                    <TextField
                        sx={{width:'100px',marginRight:'10px'}}
                        autoComplete='off'
                        type="string"
                        label="times/day"
                        value={modularPerDay}
                        onChange={handleModularPerDay}
                    ></TextField>
                    
                </FormControl>
                <FormControl sx={{display:'flex',flexDirection:'row', marginBottom:'20px'}}>
                    <TextField
                        type="string"
                        label="Water Flush Volume (mL)"
                        sx={{marginRight:'10px'}}
                        autoComplete='off'
                        value={flushAmount}
                        onChange={handleFlushAmount}
                    ></TextField>
                    <TextField
                        sx={{width:'100px'}}
                        type="string"
                        label="flushes/day"
                        autoComplete='off'
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