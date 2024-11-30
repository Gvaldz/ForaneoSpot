import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { OpinionesComidaComponent } from '../opiniones-comidas/opiniones-comida/opiniones-comida.component';

@NgModule({
    declarations: [
    NavbarComponent,
    ],
    exports: [
        NavbarComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
