import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {CardComidaComponent} from './shared/card-comida/card-comida.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComidaHomeComponent} from './servicios/comida-home/comida-home.component';
import {OrdenesComidaComponent} from './shared/ordenes-comida/ordenes-comida.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {EditarPerfilComponent} from './usuarios/editar-perfil/editar-perfil.component';
import {MenuComidaComponent} from './menus/menu-comida/menu-comida.component';
import {ComidaService} from './comida.service';
import {HttpClientModule} from '@angular/common/http';
import {MenusAlojamientosComponent} from './inmuebles/menus-alojamientos/menus-alojamientos.component';
import {RegistrarUsuarioComponent} from './usuarios/registrar-usuario/registrar-usuario.component';
import {NgOptimizedImage} from '@angular/common';
import {MenuCuartosComponent} from './inmuebles/menu-cuartos/menu-cuartos.component';
import {MenuEdificiosComponent} from './inmuebles/menu-edificios/menu-edificios.component';
import {SharedModule} from './shared/shared.module';
import {CardAlojamientoComponent} from './shared/card-alojamiento/card-alojamiento.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    CardComidaComponent,
    ComidaHomeComponent,
    OrdenesComidaComponent,
    LoginComponent,
    NavbarComponent,
    EditarPerfilComponent,
    MenuComidaComponent,
    MenusAlojamientosComponent,
    RegistrarUsuarioComponent,
    MenuCuartosComponent,
    MenuEdificiosComponent,
    CardAlojamientoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    SharedModule


  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [
    provideClientHydration(),
    ComidaService
  ]
})
export class AppModule { }
