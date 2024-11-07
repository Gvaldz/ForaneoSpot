import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaHomeComponent } from './comida-home/comida-home.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ComidaHomeComponent
  ],
  exports: [
    ComidaHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServiciosModule { }
