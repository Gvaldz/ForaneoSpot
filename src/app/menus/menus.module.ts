import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComidaComponent } from './menu-comida/menu-comida.component';
import{NavbarComponent} from '../shared/navbar/navbar.component';
import { MenusAlojamientosComponent } from './menus-alojamientos/menus-alojamientos.component';


@NgModule({
  declarations: [
    MenuComidaComponent,
    NavbarComponent,
    MenusAlojamientosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenusModule { }
