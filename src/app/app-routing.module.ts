import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { ListDeviceComponent } from './devices/list-device/list-device.component';
import { UpdateDeviceComponent } from './devices/update-device/update-device.component';
import { PrincipalComponent } from './principal/principal.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {
    path: '', component:PrincipalComponent
  },
  {
    path: 'categories', component:CategoriesComponent,
  },
  {
    path: 'devices', component:DevicesComponent, children: [
      {path:'', component:ListDeviceComponent},
      {path:'new', component:AddDeviceComponent},
      {path:'detail/:id',component:DeviceDetailComponent},
      {path:'update/:id',component:UpdateDeviceComponent}
    ]
  },
  {
    path: 'resource/:tagdevice/:tagresource',component:ResourcesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
