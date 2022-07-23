import '../App.css';
import { adjustCalcCounter, addCalc} from '../../src/redux/calcs';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react'
import Header from './Header/Header.js';
import Body from './Body/Body.js';
import AddButton from './AddButton/AddButton.js';
import CalculatorContainer from './Body/CalculatorContainer/CalculatorContainer';
import Footer from './Footer/Footer';
import {Paper, Alert} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MobileCalculatorContainer from './MobileCalculatorContainer/MobileCalculatorContainer';
import {useAuth} from '../contexts/AuthContext'

function Home({currentTheme, handleThemeChange, setCurrentTheme}){

    const {changeTheme} = useAuth();
    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    const globalUser = useSelector(state => state.calcsArray.globalUser);
    const dispatch = useDispatch();

    const addNewCalc = () => {
        dispatch(addCalc(<div key={calcCounter} data-grid={{ x: 0, y: 0, w: 4, h: 3, minW:4, maxW:4, minH:3}} id={calcCounter}>{<CalculatorContainer  key={calcCounter} id={calcCounter}/>}</div>));
        dispatch(adjustCalcCounter(1));
    }

    useEffect(()=>{ //updates users theme in the DB
        if(globalUser){
            changeTheme(globalUser,currentTheme)
        }
    },[currentTheme, changeTheme])

    return(
            <Paper component="div" className="App" square={true}>
                <Header 
                    currentTheme={currentTheme} 
                    handleThemeChange={handleThemeChange}
                    setCurrentTheme={setCurrentTheme} 
                    />
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
                    <Alert color="info"sx={{width:'400px'}}>Please Note: All calculations should be double checked for accuracy</Alert>
                    <AddButton
                        addNewCalc={addNewCalc}
                        currentTheme={currentTheme}
                    />
                    <div style={{width:'395px'}}></div>
                </div>
                <Body />
                <MobileCalculatorContainer />
                <Footer />
            </Paper>
    )
}

export default Home;