import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { AddpageComponent } from './addpage/addpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavComponent } from './nav/nav.component';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { ShowpageComponent } from './showpage/showpage.component';
import {FormsModule} from "@angular/forms";
import { DetailspageComponent } from './detailspage/detailspage.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutpageComponent,
    AddpageComponent,
    ErrorpageComponent,
    HomepageComponent,
    NavComponent,
    SettingspageComponent,
    ShowpageComponent,
    DetailspageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
