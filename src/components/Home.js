import '../App.css';
import { adjustCalcCounter, addCalc, removeCalc } from '../../src/redux/calcs';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header/Header.js';
import Body from './Body/Body.js';
import AddButton from './Body/AddButton/AddButton.js';
import CalculatorContainer from './Body/CalculatorContainer/CalculatorContainer';
import LayoutSelect from './LayoutSelect/LayoutSelect'
import Footer from './Footer/Footer';
import {Box, Paper} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MobileCalculatorContainer from './MobileCalculatorContainer/MobileCalculatorContainer';

function Home({currentTheme, handleThemeChange}){

    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    const dispatch = useDispatch();

    const addNewCalc = () => {
        dispatch(addCalc(<div key={calcCounter} data-grid={{ x: 0, y: 0, w: 4, h: 3, minW:4, maxW:4, minH:3}} id={calcCounter}>{<CalculatorContainer  key={calcCounter} id={calcCounter}/>}</div>));
        dispatch(adjustCalcCounter(1));
    }

    return(
            <Paper component="div" className="App" square={true}>
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange}/>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'50%', justifyContent:'center'}}>
                    <AddButton
                        addNewCalc={addNewCalc}
                        currentTheme={currentTheme}
                    />
                    <LayoutSelect />
                </div>
                <Body />
                <MobileCalculatorContainer />
                <Footer />
            </Paper>
    )
}

export default Home;