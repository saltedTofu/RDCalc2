import Calculator from './Calculator/Calculator';
import './Calculators.css';

function Calculators(){

    return (
        <div className="calculators">
            <Calculator />
            <Calculator />
            <Calculator />
        </div>
    )
}

export default Calculators;