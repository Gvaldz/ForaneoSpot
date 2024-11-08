import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardInicioComponent } from './shared/dashboard-inicio/dashboard-inicio.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardInicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
