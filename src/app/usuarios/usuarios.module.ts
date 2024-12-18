import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    EditarPerfilComponent,
    RegistrarUsuarioComponent,
    PerfilComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class UsuariosModule {}
