import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  deviceForm: FormGroup;

  device:Device = new Device();


  constructor(private fbGenerator: FormBuilder, private DispositivoInyectado: DeviceService, private route: Router) {
  }

  ngOnInit(): void {
    this.deviceForm = this.fbGenerator.group({
        tag:['',Validators.required],
        name:['',Validators.required],
        is_gateway:[false],
        ipv4_address:[''],
        device_parent:[0],
        description:['']
    })
  }

  add_device(){
    this.device = this.deviceForm.value as Device;
    this.DispositivoInyectado.addDevice(this.device).subscribe((deviceRecived)=>{
      this.route.navigate(['/devices'])
    })
  }

}
