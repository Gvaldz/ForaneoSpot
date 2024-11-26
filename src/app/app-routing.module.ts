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
import { DashboardInicioComponent } from './shared/dashboard-inicio/dashboard-inicio.component';
import { MenuFormComponent } from './comidas/comida-form/menu-form.component';
import {MenuCasasComponent} from './inmuebles/menu-casas/menu-casas.component';

const routes: Routes = [
  { path: 'home', component: DashboardInicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comida', component: ComidaHomeComponent},
  { path: 'vendedores', component: MenuVendedoresComponent},
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'vendedor/:id', component: DetalleVendedorComponent },
  { path: 'comida/agregar', component: MenuFormComponent },
  { path: 'comida/editar/:id', component: MenuFormComponent, },
  { path: 'alojamientos', component: MenusAlojamientosComponent },
  { path: 'menuComida', component: MenuComidaComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'editarPerfil', component: EditarPerfilComponent },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
  { path: 'menuCasas', component: MenuCasasComponent },
  { path: 'menuEdificios', component: MenuEdificiosComponent },
  { path: 'inmuebles/agregar', component: FormInmueblesComponent},
  { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'inicio', component: DashboardInicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}