import CalculatorContainer from './CalculatorContainer/CalculatorContainer.js';
import AddButton from './AddButton/AddButton';
import {useState, useEffect} from 'react';
import './Body.css';


function Body(){
    
    const [calcsArray,setCalcsArray] = useState([]);

    useEffect(()=>{
        console.log('first render');
        const currentCalcs=calcsArray.length;
        setCalcsArray([...calcsArray,<CalculatorContainer calcsArray={calcsArray} key={currentCalcs+1} id={currentCalcs+1} onClose={onClose}/>])
    },[])

    useEffect(()=>{
        //console.log('calcsArray modified');
        //console.log(calcsArray);
    },[calcsArray])
    
    const addCalc = () => {
        const currentCalcs=calcsArray.length;
        setCalcsArray([...calcsArray,<CalculatorContainer calcsArray={calcsArray} key={currentCalcs+1} id={currentCalcs+1} onClose={onClose}/>]);
    }

    const onClose = (index) => {
        setCalcsArray(calcsArray.filter((calc)=> calc.props.id !== index))
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