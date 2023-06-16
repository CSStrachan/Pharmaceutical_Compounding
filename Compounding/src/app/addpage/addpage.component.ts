import { Component } from '@angular/core';
import {Prescription} from "../../models/prescription";
import {DatabaseService} from "../../services/database.service";

declare function capturePhoto(): any;
declare function loadFromPhotoLibrary(): any;
@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})

export class AddpageComponent {
  prescription: Prescription = new Prescription("",  0, false, "", 0, 0,0);

  constructor(private database: DatabaseService) {
  }

  calculateCompound(prescription: Prescription) {
    if(!prescription.lactoseAllergy) {
      const dose = this.prescription.dose;
      const drugWeight = dose / 1000;
      const fillerAmount = (dose / 1000) * 0.25;


      this.prescription.medWeight = drugWeight;
      this.prescription.lacWeight = fillerAmount;
    }
    else{
      const dose = this.prescription.dose;
      const drugWeight = dose / 1000;
      const fillerAmount = (dose / 1000) * 0.33;


      this.prescription.medWeight = drugWeight;
      this.prescription.flrWeight = fillerAmount;
    }
  }

  btnSave_click() {
    this.calculateCompound(this.prescription);

    this.database.insert(this.prescription)
      .then((data) => {
        alert("Record added successfully");
      })
      .catch((error) => {
        alert(error);
      })
  }

  btnCapturePhoto_click() {
    capturePhoto();
  }

  btnLoadFromLibrary_click() {
    loadFromPhotoLibrary();
  }
}
