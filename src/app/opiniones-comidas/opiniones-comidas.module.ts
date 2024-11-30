import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { FormularioOpinionComponent } from './formulario-opinion/formulario-opinion.component';
import {FormsModule} from "@angular/forms";
import { OpinionesComidaComponent } from './opiniones-comida/opiniones-comida.component';
>>>>>>> develop



@NgModule({
<<<<<<< HEAD
  declarations: [],
=======
  declarations: [
    FormularioOpinionComponent,
    OpinionesComidaComponent
  ],
  exports: [
    FormularioOpinionComponent,
    OpinionesComidaComponent
  ],
>>>>>>> develop
  imports: [
    CommonModule
  ]
})
export class OpinionesComidasModule { }
