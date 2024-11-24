import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComidaComponent } from './menu-comida/menu-comida.component';
import{NavbarComponent} from '../shared/navbar/navbar.component';
import { MenusAlojamientosComponent } from '../inmuebles/menus-alojamientos/menus-alojamientos.component';
import { SharedModule } from '../shared/shared.module';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuComidaComponent,
    NavbarComponent,
    MenusAlojamientosComponent,
    MenuFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class MenusModule { }
