import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from './card-comida/card-comida.component';
import { ComidaHomeComponent } from './comida-home/comida-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CardComidaComponent,
    ComidaHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ComidasModule { }
