import { Component } from '@angular/core';
import {Prescription} from "../../models/prescription";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";

declare function capturePhoto(): any;
declare function loadFromPhotoLibrary(): any;
@Component({
  selector: 'app-detailspage',
  templateUrl: './detailspage.component.html',
  styleUrls: ['./detailspage.component.css']
})
export class DetailspageComponent {
  prescription: Prescription = new Prescription("", 0, false, "",0 ,0,0);
  errorMsg: string = "";


  constructor(private acRoute: ActivatedRoute, private database: DatabaseService) {
  }

  calculateCompound(prescription: Prescription) {
    if(prescription.lactoseAllergy == false) {
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
  ngOnInit() {
    let id = this.acRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.database.select(id)
      .then((data) => {
        this.prescription = data;
      })
      .catch((err) => {
        console.log("Error: " + err);
        this.errorMsg = err;
      });
  }

  btnUpdate_click(){
    this.calculateCompound(this.prescription);
    this.database.update(this.prescription)
      .then((data)=>{
        alert("Prescription updated successfully");
      })
      .catch((err)=>{
        alert("Error: " + err);
      });
  }
  btnCapturePhoto_click() {
    capturePhoto();
  }

  btnLoadFromLibrary_click() {
    loadFromPhotoLibrary();
  }

}
