import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCuartosComponent } from './menu-cuartos/menu-cuartos.component';
import { MenuEdificiosComponent } from './menu-edificios/menu-edificios.component';
import { SharedModule } from '../shared/shared.module';
import { MenusAlojamientosComponent } from './menus-alojamientos/menus-alojamientos.component';
import { MenuCasasComponent } from './menu-casas/menu-casas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormInmueblesComponent } from './form-inmuebles/form-inmuebles.component';


@NgModule({
  declarations: [
    MenuCuartosComponent,
    MenuEdificiosComponent,
    MenusAlojamientosComponent,
    MenuCasasComponent,
    FormInmueblesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InmueblesModule { }
