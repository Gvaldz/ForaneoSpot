import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {CardAlojamientoComponent} from './card-alojamiento/card-alojamiento.component';
import { OpinionesComidaComponent } from '../comidas/opiniones-comida/opiniones-comida.component';

@NgModule({
    declarations: [
    NavbarComponent,
      CardAlojamientoComponent,
      OpinionesComidaComponent
    ],
    exports: [
        NavbarComponent,
        CardAlojamientoComponent,
        OpinionesComidaComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
