import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PropListComponent } from './prop-list/prop-list.component';
import { CreatePropPageComponent } from './create-prop-page/create-prop-page.component';
import { EditPropPageComponent } from './edit-prop-page/edit-prop-page.component';

const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'editProp/:id', component: EditPropPageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterPageComponent, canDeactivate: [AuthGuard]},
  {path: 'props', component: PropListComponent, canActivate: [AuthGuard]},
  {path: 'createProp', component: CreatePropPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
