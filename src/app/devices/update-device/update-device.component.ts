import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {

  deviceForm: FormGroup;

  device:Device = new Device();

  constructor(private fbGenerator: FormBuilder, private DispositivoInyectado: DeviceService, private route: Router) { }

  ngOnInit(): void {
    this.deviceForm = this.fbGenerator.group({      
      name:['',Validators.required],
      gateway:[false],
      ipv4_address:[''],
      device_parent:[0],
      description:['']
    })

    this.device = this.DispositivoInyectado.device;
    this.deviceForm.setValue({
      name: this.device.name,
      gateway: this.device.gateway,
      device_parent: this.device.device_parent,
      description: this.device.description
    })

  }

  update_device(){
    this.device = this.deviceForm.value as Device;
    this.DispositivoInyectado.updateDevice(this.device).subscribe((deviceRecived)=>{
      this.route.navigate(['/devices'])
    })
  }

}
