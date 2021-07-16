import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: Array<Device> = new Array<Device>();

  constructor(private DispositivoInyectado: DeviceService) { }

  ngOnInit(): void {
    this.DispositivoInyectado.getDevices().subscribe((devicesResponse)=>{
      this.devices = devicesResponse;
    });
  }

}
