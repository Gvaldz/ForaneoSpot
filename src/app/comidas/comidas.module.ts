import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from './card-comida/card-comida.component';
import { ComidaHomeComponent } from './comida-home/comida-home.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComidaDashComponent } from './comida-home-vendedor/comida-home.component';

@NgModule({
  declarations: [
    CardComidaComponent,
    ComidaHomeComponent,
    ComidaDashComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
    
  ]
})
export class ComidasModule { }
