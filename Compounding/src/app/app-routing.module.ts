import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowpageComponent} from "./showpage/showpage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {AboutpageComponent} from "./aboutpage/aboutpage.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {AddpageComponent} from "./addpage/addpage.component";
import {DetailspageComponent} from "./detailspage/detailspage.component";

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "add", component: AddpageComponent},
  {path: "show", component: ShowpageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "detail/:id", component: DetailspageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "", redirectTo: "/home", pathMatch:"full"},
  {path: "**", component: ErrorpageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
