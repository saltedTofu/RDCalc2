import IdealBodyWeight from "./IdealBodyWeight";
import Hamwi from "./Hamwi";
import TPNPPN from "./TPNPPN";
import LbsKg from "./LbsKg";
import Mifflin from "./Mifflin";
import PennState from "./PennState";
import Notes from "./Notes";
import TubeFeed from "./TubeFeed";
import InchesCm from "./InchesCm";

interface Props {
    Calc:string;
}

function Calculator({Calc}:Props){

	if(Calc==="IBW"){
		return(
			<IdealBodyWeight />
		);
	}
	else if(Calc==="TubeFeeding"){
		return(
			<TubeFeed />
		);
	}
	else if(Calc==="TPN/PPN"){
		return(
			<TPNPPN />
		);
	}
	else if(Calc==="Notes"){
		return(
			<Notes />
		);
	}
	else if(Calc==="lbs/kg"){
		return(
			<LbsKg />
		);
	}
	else if(Calc==="Hamwi"){
		return(
			<Hamwi />
		);
	}
	else if(Calc==="PennState"){
		return(
			<PennState />
		);
	}
	else if(Calc==="Mifflin"){
		return(
			<Mifflin />
		);
	}
	else if(Calc==="InchesCm"){
		return(
			<InchesCm />
		);
	}
	return(
		<div>
		</div>
	);
}
export default Calculator;