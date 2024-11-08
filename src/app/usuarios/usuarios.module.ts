import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    EditarPerfilComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class UsuariosModule { }
