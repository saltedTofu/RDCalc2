import Inputs from './Inputs/Inputs.js';
import Calculators from './Calculators/Calculators.js';

import './Body';

function Body(){
    return(
        <div className="body">
            <Inputs />
            <Calculators />
        </div>
    )
}

export default Body;