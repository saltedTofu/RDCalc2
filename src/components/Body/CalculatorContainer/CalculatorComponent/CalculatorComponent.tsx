import './Calculator.css';
import IdealBodyWeight from './SpecificCalcs/IdealBodyWeight/IdealBodyWeight';
import Hamwi from './SpecificCalcs/Hamwi/Hamwi';
import TPNPPN from './SpecificCalcs/TPNPPN/TPNPPN';
import LbsKg from './SpecificCalcs/LbsKg/LbsKg';
import Mifflin from './SpecificCalcs/Mifflin/Mifflin';
import PennState from './SpecificCalcs/PennState/PennState';
import Notes from './SpecificCalcs/Notes/Notes';
import TubeFeed from './SpecificCalcs/TubeFeed/TubeFeed';

interface Props {
    Calc:string;
}

function Calculator({Calc}:Props){

    if(Calc==='IBW'){
        return(
            <IdealBodyWeight />
        )
    }
    else if(Calc==='TubeFeeding'){
        return(
            <TubeFeed />
        )
    }
    else if(Calc==='TPN/PPN'){
        return(
            <TPNPPN />
        )
    }
    else if(Calc==='Notes'){
        return(
            <Notes />
        )
    }
    else if(Calc==='lbs/kg'){
        return(
            <LbsKg />
        )
    }
    else if(Calc==='Hamwi'){
        return(
            <Hamwi />
        )
    }
    else if(Calc==='PennState'){
        return(
            <PennState />
        )
    }
    else if(Calc==='Mifflin'){
        return(
            <Mifflin />
        )
    }
    return(
        <div>

        </div>
    )
}
export default Calculator;