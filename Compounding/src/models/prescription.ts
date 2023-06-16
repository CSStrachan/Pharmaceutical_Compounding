export class Prescription {
  id: number = -1;
  medication: string = "";
  dose: number = 0;
  lactoseAllergy: boolean = false;
  comments = "";
  medWeight: number = 0;
  lacWeight: number = 0;
  flrWeight: number= 0;
  constructor(medication: string, dose: number,
              lactoseAllergy: boolean, comments: string,
              medWeight: number, lacWeight: number,
              flrWeight: number)
  {
    this.medication = medication;
    this.dose = dose;
    this.lactoseAllergy = lactoseAllergy;
    this.comments = comments;
    this.medWeight = medWeight;
    this.lacWeight = lacWeight;
    this.flrWeight = flrWeight;
  }
}
