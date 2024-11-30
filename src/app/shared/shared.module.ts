import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { OpinionesComidaComponent } from './opiniones-comida/opiniones-comida.component';

@NgModule({
    declarations: [
    NavbarComponent,
      OpinionesComidaComponent
    ],
    exports: [
        NavbarComponent,
        OpinionesComidaComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
