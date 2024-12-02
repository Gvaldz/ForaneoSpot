import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioOpinionComponent } from './formulario-opinion/formulario-opinion.component';
import { FormsModule } from '@angular/forms';
import { OpinionesComidaComponent } from './opiniones-comida/opiniones-comida.component';



@NgModule({
  declarations: [
    FormularioOpinionComponent,
    OpinionesComidaComponent,
  ],
  exports: [
    FormularioOpinionComponent,
    OpinionesComidaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OpinionesComidasModule { }
