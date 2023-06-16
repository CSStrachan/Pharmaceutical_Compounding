import { Component } from '@angular/core';
import {Prescription} from "../../models/prescription";
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-showpage',
  templateUrl: './showpage.component.html',
  styleUrls: ['./showpage.component.css']
})
export class ShowpageComponent {
  prescription: Prescription[] = [];
  constructor(private database: DatabaseService,
              private router: Router) {

  }

  ngOnInit(){
    this.database.selectAll()
      .then((data) => {
        console.log(data);
        this.prescription = data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  btnModify_click(prescription: Prescription) {
    this.router.navigate([`/detail/${prescription.id}`]);
  }

  btnDelete_click(prescription: Prescription) {

    this.database.delete(prescription)
      .then((data)=> {
        this.ngOnInit();
      })
      .catch((err) => {
        alert("Error in delete: " + err);
      });

  }
}
