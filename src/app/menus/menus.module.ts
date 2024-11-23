import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComidaComponent } from './menu-comida/menu-comida.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { CardComidaComponent } from '../comidas/card-comida/card-comida.component';

@NgModule({
  declarations: [
    MenuComidaComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule,
    FormsModule,
  ]
})
export class MenusModule { }
