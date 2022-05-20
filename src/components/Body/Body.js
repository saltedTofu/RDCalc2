import CalculatorContainer from './CalculatorContainer/CalculatorContainer.js';
import AddButton from './AddButton/AddButton';
import {useState} from 'react';
import './Body.css';


function Body(){
    const [numberOfCalcs,setNumberOfCalcs] = useState([1]); //number of calcs = length of the array

    return (
        <div className="body">
            {numberOfCalcs.map((calc)=><CalculatorContainer />)}
            <AddButton 
                numberOfCalcs={numberOfCalcs}
                setNumberOfCalcs={setNumberOfCalcs}
            />
        </div>
    )
}

export default Body;