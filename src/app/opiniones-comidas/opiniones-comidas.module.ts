import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioOpinionComponent } from './formulario-opinion/formulario-opinion.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FormularioOpinionComponent
  ],
  exports: [
    FormularioOpinionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OpinionesComidasModule { }
