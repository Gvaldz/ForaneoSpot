import {NgModule} from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/compiler';

import { CommonModule } from '@angular/common';
import { MenuVendedoresComponent } from './menu-vendedores/menu-vendedores.component';
import { CardVendedorComponent } from './card-vendedor/card-vendedor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { FavoritosComponent } from './favoritos/favoritos.component';



@NgModule({
  declarations: [
    MenuVendedoresComponent,
    CardVendedorComponent,
    FavoritosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class VendedoresFavoritosModule { }
