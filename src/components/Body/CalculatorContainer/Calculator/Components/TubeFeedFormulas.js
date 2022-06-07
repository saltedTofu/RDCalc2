class tubeFeed{
    constructor(kcal,protein,water,name){
      this._kcal=kcal;
      this._protein=protein;
      this._water=water;
      this._name=name;
    }
    get kcal(){
        return this._kcal;
    }
    get protein(){
        return this._protein;
    }
    get water(){
        return this._water;
    }
    get name(){
        return this._name;
    }
}
let FibersourceHN = new tubeFeed(1200,54,810, 'Fibersource HN');
let Glucerna10 = new tubeFeed(1000,41.8,853, 'Glucerna 1.0');
let Glucerna12 = new tubeFeed(1200,60,805, 'Glucerna 1.2');
let Glucerna15 = new tubeFeed(1500,82.5,759, 'Glucerna 1.5');
let Jevity10 = new tubeFeed(1060,44.3,835, 'Jevity 1.0');
let Jevity12 = new tubeFeed(1200,55.5,807, 'Jevity 1.2');
let Jevity15 = new tubeFeed(1500,63.8,760, 'Jevity 1.5');
let Nepro = new tubeFeed(1770,81,727, 'Nepro');
let Osmolite10 = new tubeFeed(1060,44.3,835, 'Osmolite 1.0');
let Osmolite12 = new tubeFeed(1200,55.5,820, 'Osmolite 1.2');
let Osmolite15 = new tubeFeed(1500,62.7,762, 'Osmolite 1.5');
let Pivot15 = new tubeFeed(1500,93.8,750, 'Pivot 1.5');
let Promote = new tubeFeed(1000,62.5,839, 'Promote');
let PromoteWithFiber = new tubeFeed(1000,62.5,831, 'Promite With Fiber');
let Pulmocare = new tubeFeed(1500,62.6,785, 'Pulmocare');
let Suplena = new tubeFeed(1800,44.7,725.7, 'Suplena');
let TwoCalHN = new tubeFeed(2000,83.5,700, 'TwoCal HN');
let Vital10 = new tubeFeed(1000,40,834, 'Vital 1.0');
let VitalAF12 = new tubeFeed(1200,75,811, 'Vital AF 1.2');
let Vital15 = new tubeFeed(1500,67.5,764, 'Vital 1.5');
let VitalHighProtein = new tubeFeed(1000,87.3,836, 'Vital High Protein');
let Compleat = new tubeFeed(1060,48,828, 'Compleat');
let Glytrol = new tubeFeed(1000,45.2,840, 'Glytrol');
let Impact = new tubeFeed(1000,56,852, 'Impact');
let ImpactPeptide15 = new tubeFeed(1500,94,770, 'Impact Peptide 1.5');
let IsosourceHN = new tubeFeed(1200,54,808, 'Isosource HN');
let Nutren10 = new tubeFeed(1000,40,844, 'Nutren 1.0');
let Nutren10WithFiber = new tubeFeed(1000,40,848, 'Nutren 1.0 With Fiber');
let Nutren15 = new tubeFeed(1500,68,764, 'Nutren 1.5');
let Peptamen = new tubeFeed(1000,40,848, 'Peptamen');
let Peptamen15 = new tubeFeed(1500,68,772, 'Peptamen 1.5');
let Renalcal = new tubeFeed(1000,34,704, 'Renalcal');
let Replete = new tubeFeed(1000,64,840, 'Replete');
let Isosource15 = new tubeFeed(1500,68,760, 'Isosource 1.5');
let Nutren20 = new tubeFeed(2000,84,690, 'Nutren 2.0');
let DiabetisourceAC = new tubeFeed (1200,60,820, 'Diabetsource AC');
let NovasourceRenal = new tubeFeed (2000,90.7,720, 'Novasource Renal');
let PeptamenAF12 = new tubeFeed(1200,76,810, 'Peptamen AF 1.2');
let PeptamenIntenseVHP = new tubeFeed(1000,92,840, 'Peptamen Intense VHP');
let VivonexRTF = new tubeFeed(1000,50,850, 'Vivonex RTF');
let KateFarmsStandard10 = new tubeFeed(1000,49.2,800, 'Kate Farms Standard 1.0');
let KateFarmsStandard14 = new tubeFeed(1400,61.5,720, 'Kate Farms Standard 1.4');
let KateFarmsPeptide10 = new tubeFeed(1000,49.2,790, 'Kate Farms Peptide 1.0');
let KateFarmsPeptide15 = new tubeFeed(1538,73.8,700, 'Kate Farms Peptide 1.5');
const Formulas = {
    Compleat,
    DiabetisourceAC,
    FibersourceHN,
    Glucerna10,
    Glucerna12,
    Glucerna15,
    Glytrol,
    Impact,
    ImpactPeptide15,
    Isosource15,
    IsosourceHN,
    Jevity10,
    Jevity12,
    Jevity15,
    KateFarmsStandard10,
    KateFarmsStandard14,
    KateFarmsPeptide10,
    KateFarmsPeptide15,
    Nepro,
    NovasourceRenal,
    Nutren10,
    Nutren10WithFiber,
    Nutren15,
    Nutren20,
    Osmolite10,
    Osmolite12,
    Osmolite15,
    Peptamen,
    PeptamenAF12,
    Peptamen15,
    PeptamenIntenseVHP,
    Pivot15,
    Promote,
    PromoteWithFiber,
    Pulmocare,
    Renalcal,
    Replete,
    Suplena,
    TwoCalHN,
    Vital10,
    VitalAF12,
    Vital15,
    VitalHighProtein,
    VivonexRTF
}

export default Formulas;