import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComidaHomeComponent } from './menus/comida-home/comida-home.component';
import { EditarPerfilComponent } from './usuarios/editar-perfil/editar-perfil.component';
import { MenuComidaComponent } from './menus/menu-comida/menu-comida.component';
import { MenuFormComponent } from './menus/menu-form/menu-form.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'comida', component: ComidaHomeComponent },
  { path: 'menuComida', component: MenuComidaComponent },
  { path: 'editarPerfil', component: EditarPerfilComponent },
  { path: 'formulario-comida', component: MenuFormComponent },  
  { path: 'formulario-comida/:id', component: MenuFormComponent },  
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
