import { NgModule } from '@angular/core';
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
import {MenusAlojamientosComponent} from './menus/menus-alojamientos/menus-alojamientos.component';
import {RegistrarUsuarioComponent} from './usuarios/registrar-usuario/registrar-usuario.component';
import {NgOptimizedImage} from '@angular/common';

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
    RegistrarUsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage


  ],
  providers: [
    provideClientHydration(),
    ComidaService
  ]
})
export class AppModule { }
