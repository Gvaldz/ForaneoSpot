import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MenusModule } from './menus/menus.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SharedModule } from './shared/shared.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ComidasModule } from './comidas/comidas.module';
import { InmueblesModule } from './inmuebles/inmuebles.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './servicios/auth.interceptor';
import { DashboardInicioComponent} from './shared/dashboard-inicio/dashboard-inicio.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DashboardInicioComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MenusModule,
    UsuariosModule, 
    SharedModule,
    ServiciosModule,
    ComidasModule,
    InmueblesModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
