import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {CardAlojamientoComponent} from './card-alojamiento/card-alojamiento.component';
import { OpinionesComidaComponent } from './opiniones-comida/opiniones-comida.component';
//import { PropertyCardComponent } from './property-card/property-card.component';
//import { DetallePropiedadComponent } from './detalle-propiedad/detalle-propiedad.component';

@NgModule({
    declarations: [
    NavbarComponent,
      CardAlojamientoComponent,
      OpinionesComidaComponent,
      //PropertyCardComponent,
      //DetallePropiedadComponent
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
