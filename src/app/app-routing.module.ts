import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ComidaHomeComponent} from './comidas/comida-home/comida-home.component';
import {EditarPerfilComponent} from './usuarios/editar-perfil/editar-perfil.component';
import {MenuComidaComponent} from './menus/menu-comida/menu-comida.component';
import {MenusAlojamientosComponent} from './inmuebles/menus-alojamientos/menus-alojamientos.component';
import {RegistrarUsuarioComponent} from './usuarios/registrar-usuario/registrar-usuario.component';
import {MenuCuartosComponent} from './inmuebles/menu-cuartos/menu-cuartos.component';
import {MenuEdificiosComponent} from './inmuebles/menu-edificios/menu-edificios.component';
import { ComidaDashComponent } from './comidas/comida-home-vendedor/comida-home.component';
import { DashboardInicioComponent } from './shared/dashboard-inicio/dashboard-inicio.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'comida', component: ComidaHomeComponent },
  {path: 'alojamientos', component: MenusAlojamientosComponent},
  {path: 'menuComida', component: MenuComidaComponent },
  {path: 'editarPerfil', component: EditarPerfilComponent },
  {path: 'registrarUsuario', component: RegistrarUsuarioComponent},
  {path: 'menuCuartos', component: MenuCuartosComponent},
  {path: 'menuEdificios', component: MenuEdificiosComponent},
  {path: 'vendedor-comida', component: ComidaDashComponent},
  { path: '**', redirectTo: '/login'},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'inicio', component: DashboardInicioComponent},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
