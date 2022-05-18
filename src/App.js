import './App.css';
import { adjustCalcCounter, addCalc, removeCalc } from '../src/redux/calcs';
import {useSelector, useDispatch} from 'react-redux';
import Header from './components/Header/Header.js';
import Body from './components/Body/Body.js';
import AddButton from './components/Body/AddButton/AddButton.js';
import CalculatorContainer from './components/Body/CalculatorContainer/CalculatorContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../node_modules/react-grid-layout/css/styles.css';

function App() {

    const calcCounter = useSelector(state => state.calcsArray.calcCounter);
    const dispatch = useDispatch();

    const onClose = (index) => {
      dispatch(removeCalc(index));
  }
    const addNewCalc = () => {
        dispatch(addCalc(<div key={calcCounter} data-grid={{ x: 1, y: 0, w: 4, h: 3, minW:4, maxW:6, minH:3}} id={calcCounter}>{<CalculatorContainer  key={calcCounter} id={calcCounter} onClose={onClose}/>}</div>));
        dispatch(adjustCalcCounter(1));
    }

  return (
    <div className="App">
      <Header />
      <AddButton 
        addNewCalc={addNewCalc}
      />
      <Body />
    </div>
  );
}

export default App;
