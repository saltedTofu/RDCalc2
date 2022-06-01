import '../App.css';
import { adjustCalcCounter, addCalc, removeCalc } from '../../src/redux/calcs';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header/Header.js';
import Body from './Body/Body.js';
import AddButton from './Body/AddButton/AddButton.js';
import CalculatorContainer from './Body/CalculatorContainer/CalculatorContainer';
import Footer from './Footer/Footer';
import {Box, Paper} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Home({currentTheme, handleThemeChange}){

    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    const dispatch = useDispatch();

    const onClose = (index) => {
      dispatch(removeCalc(index));
  }
    const addNewCalc = () => {
        dispatch(addCalc(<div key={calcCounter} data-grid={{ x: 0, y: 0, w: 4, h: 3, minW:4, maxW:4, minH:3}} id={calcCounter}>{<CalculatorContainer  key={calcCounter} id={calcCounter} onClose={onClose}/>}</div>));
        dispatch(adjustCalcCounter(1));
    }

    return(
            <Paper component="div" className="App" square={true}>
                <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange}/>
                <AddButton
                    addNewCalc={addNewCalc}
                />
                <Body />
                <Footer />
            </Paper>
    )
}
export default Home;