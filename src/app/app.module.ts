import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceService } from './services/device.service';
import { HttpClientModule } from '@angular/common/http';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { ListDeviceComponent } from './devices/list-device/list-device.component'
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { UpdateDeviceComponent } from './devices/update-device/update-device.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DevicesComponent,
    AddDeviceComponent,
    ListDeviceComponent,
    DeviceDetailComponent,
    UpdateDeviceComponent,
    ResourcesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
