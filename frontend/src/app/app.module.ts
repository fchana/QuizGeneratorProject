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
import { RegisterPageComponent } from './register-page/register-page.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { PropListComponent } from './prop-list/prop-list.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { CreatePropPageComponent } from './create-prop-page/create-prop-page.component';
import { EditPropPageComponent } from './edit-prop-page/edit-prop-page.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { EditQuizPageComponent } from './edit-quiz-page/edit-quiz-page.component';
import { CreateQuizPageComponent } from './create-quiz-page/create-quiz-page.component';
import { ChoiceListComponent } from './choice-list/choice-list.component';
import { CreateChoicePageComponent } from './create-choice-page/create-choice-page.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { EditChoicePageComponent } from './edit-choice-page/edit-choice-page.component';
import { PreviewPropComponent } from './preview-prop/preview-prop.component';
import {PaginatorModule} from 'primeng/paginator';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { GivePermissionComponent } from './give-permission/give-permission.component';
import {PickListModule} from 'primeng/picklist';
import {DropdownModule} from 'primeng/dropdown';
import { PropInfoComponent } from './prop-info/prop-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginButtonComponent,
    AuthenticationButtonComponent,
    LogoutButtonComponent,
    PropListComponent,
    CreatePropPageComponent,
    EditPropPageComponent,
    QuizListComponent,
    EditQuizPageComponent,
    CreateQuizPageComponent,
    ChoiceListComponent,
    CreateChoicePageComponent,
    EditChoicePageComponent,
    PreviewPropComponent,
    GivePermissionComponent,
    PropInfoComponent
    
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
    PanelMenuModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    PaginatorModule,
    ToggleButtonModule,
    PickListModule,
    DropdownModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    TableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
