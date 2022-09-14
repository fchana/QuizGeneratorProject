import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { PropListComponent } from './prop-list/prop-list.component';
import { CreatePropPageComponent } from './create-prop-page/create-prop-page.component';
import { EditPropPageComponent } from './edit-prop-page/edit-prop-page.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { EditQuizPageComponent } from './edit-quiz-page/edit-quiz-page.component';
import { CreateQuizPageComponent } from './create-quiz-page/create-quiz-page.component';
import { ChoiceListComponent } from './choice-list/choice-list.component';
import { CreateChoicePageComponent } from './create-choice-page/create-choice-page.component';
import { EditChoicePageComponent } from './edit-choice-page/edit-choice-page.component';

const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'editProp/:id', component: EditPropPageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterPageComponent},
  {path: 'props', component: PropListComponent, canActivate: [AuthGuard]},
  {path: 'createProp', component: CreatePropPageComponent, canActivate: [AuthGuard]},
  {path: 'props/:id/quizs', component: QuizListComponent, canActivate: [AuthGuard]},
  {path: 'props/:pid/editQuiz/:id', component: EditQuizPageComponent, canActivate: [AuthGuard]},
  {path: 'props/:pid/createQuiz/:id', component: CreateQuizPageComponent, canActivate: [AuthGuard]},
  {path: 'props/:pid/quizs/:qid/choice', component: ChoiceListComponent, canActivate: [AuthGuard]},
  {path: 'props/:pid/quizs/:qid/createChoice/:cid', component: CreateChoicePageComponent, canActivate: [AuthGuard]},
  {path: 'props/:pid/quizs/:qid/editchoice/:cid', component: EditChoicePageComponent, canActivate: [AuthGuard]},
  {path: '**', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
