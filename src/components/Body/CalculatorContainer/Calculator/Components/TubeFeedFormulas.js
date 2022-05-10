class tubeFeed{
    constructor(kcal,protein,water){
      this._kcal=kcal;
      this._protein=protein;
      this._water=water;
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
}
let FibersourceHN = new tubeFeed(1200,54,810);
let Glucerna10 = new tubeFeed(1000,41.8,853);
let Glucerna12 = new tubeFeed(1200,60,805);
let Glucerna15 = new tubeFeed(1500,82.5,759);
let Jevity10 = new tubeFeed(1060,44.3,835);
let Jevity12 = new tubeFeed(1200,55.5,807);
let Jevity15 = new tubeFeed(1500,63.8,760);
let Nepro = new tubeFeed(1770,81,727);
let Osmolite10 = new tubeFeed(1060,44.3,835);
let Osmolite12 = new tubeFeed(1200,55.5,820);
let Osmolite15 = new tubeFeed(1500,62.7,762);
let Pivot15 = new tubeFeed(1500,93.8,750);
let Promote = new tubeFeed(1000,62.5,839);
let PromoteWithFiber = new tubeFeed(1000,62.5,831);
let Pulmocare = new tubeFeed(1500,62.6,785);
let Suplena = new tubeFeed(1800,44.7,725.7);
let TwoCalHN = new tubeFeed(2000,83.5,700);
let Vital10 = new tubeFeed(1000,40,834);
let VitalAF12 = new tubeFeed(1200,75,811);
let Vital15 = new tubeFeed(1500,67.5,764);
let VitalHighProtein = new tubeFeed(1000,87.3,836);
let Compleat = new tubeFeed(1060,48,828);
let Glytrol = new tubeFeed(1000,45.2,840);
let Impact = new tubeFeed(1000,56,852);
let ImpactPeptide15 = new tubeFeed(1500,94,770);
let IsosourceHN = new tubeFeed(1200,54,808);
let Nutren10 = new tubeFeed(1000,40,844);
let Nutren10WithFiber = new tubeFeed(1000,40,848);
let Nutren15 = new tubeFeed(1500,68,764);
let Peptamen = new tubeFeed(1000,40,848);
let Peptamen15 = new tubeFeed(1500,68,772);
let Renalcal = new tubeFeed(1000,34,704);
let Replete = new tubeFeed(1000,64,840);
let Isosource15 = new tubeFeed(1500,68,760);
let Nutren20 = new tubeFeed(2000,84,690);
let DiabetisourceAC = new tubeFeed (1200,60,820);
let NovasourceRenal = new tubeFeed (2000,90.7,720);
let PeptamenAF12 = new tubeFeed(1200,76,810);
let PeptamenIntenseVHP = new tubeFeed(1000,92,840);
let VivonexRTF = new tubeFeed(1000,50,850);
let KateFarmsStandard10 = new tubeFeed(1000,49.2,800);
let KateFarmsStandard14 = new tubeFeed(1400,61.5,720);
let KateFarmsPeptide10 = new tubeFeed(1000,49.2,790);
let KateFarmsPeptide15 = new tubeFeed(1538,73.8,700);
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