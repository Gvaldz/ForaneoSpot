import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from './card-comida/card-comida.component';
import { OrdenesComidaComponent } from './ordenes-comida/ordenes-comida.component';



@NgModule({
    declarations: [
        CardComidaComponent,
        OrdenesComidaComponent
    ],
    exports: [
        CardComidaComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
