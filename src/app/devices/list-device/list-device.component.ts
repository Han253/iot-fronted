import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.css']
})
export class ListDeviceComponent implements OnInit {

  devices: Array<Device> = new Array<Device>();

  constructor(private DispositivoInyectado: DeviceService, private route: Router) { }

  ngOnInit(): void {
    this.DispositivoInyectado.getDevices().subscribe((devicesResponse)=>{
      this.devices = devicesResponse;
    });
  }

  passDevice(deviceRecived:Device){
    this.DispositivoInyectado.device = deviceRecived;
    this.route.navigate(['/devices/detail/'+deviceRecived.tag])
  }
  
  update(device:Device){
    this.DispositivoInyectado.device = device;
    this.route.navigate(['/devices/update/'+device.tag])
  }

  delete(tag:string){
    this.DispositivoInyectado.deleteDevice(tag).subscribe((response)=>{
      this.DispositivoInyectado.getDevices().subscribe((devicesResponse)=>{
        this.devices = devicesResponse;
      });
    })
  }

}
