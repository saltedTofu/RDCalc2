import './Calculator.css';
import IdealBodyWeight from './Components/IdealBodyWeight';
import Hamwi from './Components/Hamwi';
import TPNPPN from './Components/TPNPPN';
import LbsKg from './Components/LbsKg';
import Mifflin from './Components/Mifflin';
import PennState from './Components/PennState';
import Notes from './Components/Notes';
import TubeFeed from './Components/TubeFeed/TubeFeed';

function Calculator({Calc}){

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