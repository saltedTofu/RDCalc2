class tubeFeed{
    constructor(kcal,protein,water,name,reference){
      this._kcal=kcal;
      this._protein=protein;
      this._water=water;
      this._name=name;
      this._reference=reference
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
    get reference(){
        return this._reference;
    }
}
//Abbot
let Glucerna10 = new tubeFeed(1000,41.8,853, 'Glucerna 1.0', 'https://abbottnutrition.com/glucerna-1_0-cal');
let Glucerna12 = new tubeFeed(1200,60,805, 'Glucerna 1.2', 'https://abbottnutrition.com/glucerna-1_2-cal');
let Glucerna15 = new tubeFeed(1500,82.5,759, 'Glucerna 1.5', 'https://abbottnutrition.com/glucerna-1_5-cal');
let Jevity10 = new tubeFeed(1060,44.3,835, 'Jevity 1.0', 'https://abbottnutrition.com/jevity-1_0-cal');
let Jevity12 = new tubeFeed(1200,55.5,807, 'Jevity 1.2', 'https://abbottnutrition.com/jevity-1_2-cal');
let Jevity15 = new tubeFeed(1500,63.8,760, 'Jevity 1.5', 'https://abbottnutrition.com/jevity-1_5-cal');
let Nepro = new tubeFeed(1770,81,727, 'Nepro', 'https://abbottnutrition.com/nepro-with-carbsteady');
let Osmolite10 = new tubeFeed(1060,44.3,835, 'Osmolite 1.0', 'https://abbottnutrition.com/osmolite-1_0-cal');
let Osmolite12 = new tubeFeed(1200,55.5,820, 'Osmolite 1.2', 'https://abbottnutrition.com/osmolite-1_2-cal');
let Osmolite15 = new tubeFeed(1500,62.7,762, 'Osmolite 1.5', 'https://abbottnutrition.com/osmolite-1_5-cal');
let Pivot15 = new tubeFeed(1500,93.8,750, 'Pivot 1.5', 'https://abbottnutrition.com/pivot-1_5-cal');
let Promote = new tubeFeed(1000,63,839, 'Promote','https://abbottnutrition.com/promote', 'https://abbottnutrition.com/promote');
let PromoteWithFiber = new tubeFeed(1000,63,831, 'Promite With Fiber', 'https://abbottnutrition.com/promote-with-fiber');
let Pulmocare = new tubeFeed(1500,62.6,785, 'Pulmocare', 'https://abbottnutrition.com/pulmocare');
let Suplena = new tubeFeed(1800,44.7,725.7, 'Suplena', 'https://abbottnutrition.com/suplena-with-carbsteady');
let TwoCalHN = new tubeFeed(2000,83.5,700, 'TwoCal HN', 'https://abbottnutrition.com/twocal-hn');
let Vital10 = new tubeFeed(1000,40,834, 'Vital 1.0', 'https://abbottnutrition.com/vital-1_0-cal');
let VitalAF12 = new tubeFeed(1200,75,811, 'Vital AF 1.2', 'https://abbottnutrition.com/vital-af-1_2-cal');
let Vital15 = new tubeFeed(1500,67.5,764, 'Vital 1.5', 'https://abbottnutrition.com/vital-1_5-cal');
let VitalHighProtein = new tubeFeed(1000,87.3,836, 'Vital High Protein', 'https://abbottnutrition.com/vital-hp');
//Nestle
let Compleat = new tubeFeed(1060,48,828, 'Compleat', 'https://www.nestlemedicalhub.com/products/compleat');
let DiabetisourceAC = new tubeFeed (1200,60,820, 'Diabetsource AC', 'https://www.nestlemedicalhub.com/products/diabetisource-ac');
let FibersourceHN = new tubeFeed(1200,54,810, 'Fibersource HN', 'https://www.nestlemedicalhub.com/products/fibersource-hn');
let Glytrol = new tubeFeed(1000,45.2,840, 'Glytrol','https://www.nestlemedicalhub.com/products/glytrol');
let Impact = new tubeFeed(1000,56,852, 'Impact', 'https://www.nestlemedicalhub.com/products/impact');
let ImpactPeptide15 = new tubeFeed(1500,94,770, 'Impact Peptide 1.5', 'https://www.nestlemedicalhub.com/products/impact-peptide-15');
let ImpactAdvancedRecovery = new tubeFeed(1120,104,812, 'Impact Advanced Recovery', 'https://www.nestlemedicalhub.com/products/impact-advanced-recovery');
let IsosourceHN = new tubeFeed(1200,54,808, 'Isosource HN', 'https://www.nestlemedicalhub.com/products/isosource-hn');
let Isosource15 = new tubeFeed(1500,68,760, 'Isosource 1.5', 'https://www.nestlemedicalhub.com/products/isosource-15-cal');
let Nutren20 = new tubeFeed(2000,84,690, 'Nutren 2.0', 'https://www.nestlemedicalhub.com/products/nutren-20');
let NovasourceRenal = new tubeFeed (2000,90.7,720, 'Novasource Renal', 'https://www.nestlemedicalhub.com/products/novasource-renal');
let Nutren10 = new tubeFeed(1000,40,844, 'Nutren 1.0', 'https://www.nestlemedicalhub.com/products/nutren-10');
let Nutren10WithFiber = new tubeFeed(1000,40,848, 'Nutren 1.0 With Fiber', 'https://www.nestlemedicalhub.com/products/nutren-10-fiber');
let Nutren15 = new tubeFeed(1500,68,764, 'Nutren 1.5', 'https://www.nestlemedicalhub.com/products/nutren-15');
let Peptamen = new tubeFeed(1000,40,848, 'Peptamen', 'https://www.nestlemedicalhub.com/products/peptamen');
let Peptamen15 = new tubeFeed(1500,68,772, 'Peptamen 1.5', 'https://www.nestlemedicalhub.com/products/peptamen-15');
let PeptamenAF12 = new tubeFeed(1200,76,810, 'Peptamen AF 1.2', 'https://www.nestlemedicalhub.com/products/peptamen-af');
let PeptamenIntenseVHP = new tubeFeed(1000,92,840, 'Peptamen Intense VHP', 'https://www.nestlemedicalhub.com/products/peptamen-intense-vhp');
let Renalcal = new tubeFeed(1000,34,704, 'Renalcal', 'https://www.nestlemedicalhub.com/products/renalcal');
let Replete = new tubeFeed(1000,64,840, 'Replete', 'https://www.nestlemedicalhub.com/products/replete');
let VivonexRTF = new tubeFeed(1000,50,850, 'Vivonex RTF', 'https://www.nestlemedicalhub.com/products/vivonex-rtf');
//Kate farms
let KateFarmsStandard10 = new tubeFeed(1000,49.2,800, 'Kate Farms Standard 1.0', 'https://shop.katefarms.com/products/standard-1-0-plain');
let KateFarmsStandard14 = new tubeFeed(1400,61.5,720, 'Kate Farms Standard 1.4', 'https://shop.katefarms.com/products/standard-1-4-plain-formula');
let KateFarmsPeptide10 = new tubeFeed(1000,49.2,790, 'Kate Farms Peptide 1.0', 'https://shop.katefarms.com/products/peptide-1-0-plain-formula');
let KateFarmsPeptide15 = new tubeFeed(1538,73.8,700, 'Kate Farms Peptide 1.5', 'https://shop.katefarms.com/products/peptide-plain-1-5-formula');

const Formulas = {
    Compleat,
    DiabetisourceAC,
    FibersourceHN,
    Glucerna10,
    Glucerna12,
    Glucerna15,
    Glytrol,
    Impact,
    ImpactAdvancedRecovery,
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