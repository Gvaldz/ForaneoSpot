import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ComidaHomeComponent} from './servicios/comida-home/comida-home.component';
import {EditarPerfilComponent} from './usuarios/editar-perfil/editar-perfil.component';
import {MenuComidaComponent} from './menus/menu-comida/menu-comida.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'comida', component: ComidaHomeComponent },
  { path: 'menuComida', component: MenuComidaComponent },
  { path: 'editarPerfil', component: EditarPerfilComponent },

  { path: '**', redirectTo: '/login'},
  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
