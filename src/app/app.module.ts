import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {CardComidaComponent} from './comidas/card-comida/card-comida.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComidaHomeComponent} from './comidas/comida-home/comida-home.component';
import {OrdenesComidaComponent} from './pedidos/ordenes-comida/ordenes-comida.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {EditarPerfilComponent} from './usuarios/editar-perfil/editar-perfil.component';
import {MenuComidaComponent} from './menus/menu-comida/menu-comida.component';
import {ComidaService} from './comidas/comida.service';
import {HttpClientModule} from '@angular/common/http';
import {MenusAlojamientosComponent} from './inmuebles/menus-alojamientos/menus-alojamientos.component';
import {RegistrarUsuarioComponent} from './usuarios/registrar-usuario/registrar-usuario.component';
import {NgOptimizedImage} from '@angular/common';
import {MenuCuartosComponent} from './inmuebles/menu-cuartos/menu-cuartos.component';
import {MenuEdificiosComponent} from './inmuebles/menu-edificios/menu-edificios.component';
import { ArrendamientosModule } from './arrendamientos/arrendamientos.module';
import { CitasVisitasModule } from './citas-visitas/citas-visitas.module';
import { InmueblesModule } from './inmuebles/inmuebles.module';
import { MenusModule } from './menus/menus.module';
import { ServerModule } from '@angular/platform-server';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ComidasModule } from './comidas/comidas.module';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    ArrendamientosModule,
    CitasVisitasModule,
    InmueblesModule,
    MenusModule,
    ServerModule,
    SharedModule,
    UsuariosModule,
    ComidasModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [
    provideClientHydration(),
    ComidaService
  ]
})
export class AppModule { }
