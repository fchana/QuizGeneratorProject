import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MenubarModule} from 'primeng/menubar';
import {AccordionModule} from 'primeng/accordion';
import { NavbarComponent } from './navbar/navbar.component';    
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {PanelMenuModule} from 'primeng/panelmenu';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    FormsModule,
    PanelMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
