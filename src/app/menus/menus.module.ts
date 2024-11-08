import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComidaComponent } from './menu-comida/menu-comida.component';
import{NavbarComponent} from '../shared/navbar/navbar.component';


@NgModule({
  declarations: [
    MenuComidaComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenusModule { }
