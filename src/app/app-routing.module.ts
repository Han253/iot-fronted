import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: '', component:PrincipalComponent
  },
  {
    path: 'devices', component:DevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
