import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaHomeComponent } from './comida-home/comida-home.component';
import {SharedModule} from "../shared/shared.module";
import {NavbarComponent} from '../shared/navbar/navbar.component';
import { CuartosHomeComponent } from './cuartos-home/cuartos-home.component';


@NgModule({
  declarations: [
    ComidaHomeComponent,
    NavbarComponent,
    CuartosHomeComponent
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
