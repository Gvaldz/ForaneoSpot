import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { GuiaCardComponent } from './guia-card/guia-card.component';
import { GuiaListComponent } from './guia-list/guia-list.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
    NavbarComponent,
    GuiaCardComponent,
    GuiaListComponent,
    ],
    exports: [
        NavbarComponent,
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
