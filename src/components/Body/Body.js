import CalculatorContainer from './CalculatorContainer/CalculatorContainer.js';
import AddButton from './AddButton/AddButton';
import {useState, useEffect} from 'react';
import './Body.css';


function Body(){
    
    const [calcsArray,setCalcsArray] = useState([]);

    useEffect(()=>{
        console.log('first render');
        const currentCalcs=calcsArray.length;
        setCalcsArray([...calcsArray,<CalculatorContainer calcsArray={calcsArray} handleClose={handleClose} key={currentCalcs+1} id={currentCalcs+1}/>])
    },[])

    useEffect(()=>{
        console.log('calcsArray modified');
    },[calcsArray])

    const handleClose = (index) => {
        const newArray = calcsArray.filter((calc)=> calc.props.id !== index);
        setCalcsArray(newArray);
    }
    
    
    
    const addCalc = () => {
        const currentCalcs=calcsArray.length;
        setCalcsArray([...calcsArray,<CalculatorContainer calcsArray={calcsArray} handleClose={handleClose} key={currentCalcs+1} id={currentCalcs+1}/>])
    }

    return (
        <div>
            <AddButton 
                addCalc={addCalc}
            />
            <div className="body">
                {calcsArray}
            </div>
        </div>
        
    )
}

export default Body;