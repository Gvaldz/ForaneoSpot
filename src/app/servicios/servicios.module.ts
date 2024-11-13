import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComidaHomeComponent } from '../menus/comida-home/comida-home.component';
import {SharedModule} from "../shared/shared.module";
import {NavbarComponent} from '../shared/navbar/navbar.component';
import { MenusModule } from '../menus/menus.module';


@NgModule({
  declarations: [
    ComidaHomeComponent,
  ],
  exports: [
    ComidaHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule, MenusModule
  ]
})
export class ServiciosModule { }
