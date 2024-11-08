import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ComidaHomeComponent} from './servicios/comida-home/comida-home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'comida', component: ComidaHomeComponent },
  { path: '', redirectTo: '/comida', pathMatch: 'full' },
  { path: '**', redirectTo: '/comida'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
