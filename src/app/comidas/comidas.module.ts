import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from './card-comida/card-comida.component';
import { ComidaHomeComponent } from './comida-home/comida-home.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuFormComponent } from './comida-form/menu-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import {OpinionesComidasModule} from '../opiniones-comidas/opiniones-comidas.module';

@NgModule({
  declarations: [
    CardComidaComponent,
    ComidaHomeComponent,
    MenuFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    OpinionesComidasModule,
  ]
})
export class ComidasModule { }
