export interface ModularObject {
    kcal:number;
    protein:number;
    name:string;
    reference:string;
}

class modular implements ModularObject{
	constructor(kcal:number,protein:number,name:string,reference:string){
		this._kcal=kcal;
		this._protein=protein;
		this._name=name;
		this._reference=reference;
	}
	_kcal = 0;
	_protein = 0;
	_name = '';
	_reference = '';
	get kcal(){
		return this._kcal;
	}
	get protein(){
		return this._protein;
	}
	get name(){
		return this._name;
	}
	get reference(){
		return this._reference;
	}
}
//Abbot
const Juven = new modular(80,2.5,'Juven (23g)', 'https://abbottnutrition.com/juven');
//Nestle
const Arginaid = new modular(30,0,'Arginaid (9.2g)','https://www.nestlemedicalhub.com/products/arginaid');
const BeneCalorie = new modular(330,7,'BeneCalorie (44mL)','https://www.nestlemedicalhub.com/products/benecalorie');
const Beneprotein = new modular(25,6,'Beneprotein (7g)','https://www.nestlemedicalhub.com/products/beneprotein');
const Glutasolve = new modular(90,0,'Glutasolve (22.5g)','https://www.nestlemedicalhub.com/products/glutasolve');
const Microlipid = new modular(67.5,0,'Microlipid (15mL)', 'https://www.nestlemedicalhub.com/products/microlipid');
const MCTOIL = new modular(115,0,'MCT Oil (Nestle 15ml)', 'https://www.nestlemedicalhub.com/products/mct-oil');
const NutrisourceFiber = new modular(5,0,'Nutrisource Fiber (4g)','https://www.nestlemedicalhub.com/products/nutrisource-fiber');
//Other

export type ModularsType = 'none' | 'Arginaid' | 'BeneCalorie' | 'Beneprotein' | 'Glutasolve' | 'Juven' | 'MCTOIL' | 'Microlipid' | 'NutrisourceFiber'

export const Modulars = {
	Arginaid,
	BeneCalorie,
	Beneprotein,
	Glutasolve,
	Juven,
	MCTOIL,
	Microlipid,
	NutrisourceFiber
};
