import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {CardComidaComponent} from './shared/card-comida/card-comida.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComidaHomeComponent} from './servicios/comida-home/comida-home.component';
import {OrdenesComidaComponent} from './shared/ordenes-comida/ordenes-comida.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComidaComponent,
    ComidaHomeComponent,
    OrdenesComidaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
