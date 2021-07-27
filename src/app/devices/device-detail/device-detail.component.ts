import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { Propertie } from 'src/app/models/propertie';
import { Resource } from 'src/app/models/resources';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device:Device = new Device();
  deviceTag:string;
  propertieForm: FormGroup;
  propertie:Propertie = new Propertie();
  propertyRecived:Propertie = new Propertie();
  resourceForm: FormGroup;
  resource:Resource = new Resource();
  resourceRecived:Resource = new Resource();

  constructor(private fbGenerator: FormBuilder, private DispositivoInyectado: DeviceService, private route: Router,private RutaActiva: ActivatedRoute) { }

  

  ngOnInit(): void {
    this.deviceTag = this.RutaActiva.snapshot.params.tag;
    this.DispositivoInyectado.getDevice(this.deviceTag).subscribe((deviceResponse)=>{
        this.device = deviceResponse;
        this.DispositivoInyectado.device = deviceResponse;
    });

    this.propertieForm = this.fbGenerator.group({
      name:['',Validators.required],
      value:['',Validators.required],
      description:['']
    });

    this.resourceForm = this.fbGenerator.group({
      tag:['',Validators.required],
      name:['',Validators.required],
      resource_type:['SENSOR'],
      description:['']
    });
    
  }

  addPropertie(){
    this.propertie = this.propertieForm.value as Propertie;
    this.propertie.device_parent = this.device.id;
    this.DispositivoInyectado.addPropertie(this.propertie).subscribe((propertieRecived)=>{
      this.propertyRecived = propertieRecived;
      this.device.properties_list.push(this.propertyRecived);
    })
  }

  deletePropertie(property:Propertie){
    this.DispositivoInyectado.deletePropertie(property.id).subscribe((response)=>{
      var index = this.device.properties_list.indexOf(property,0);
      if (index > -1){
        this.device.properties_list.splice(index,1);
      }      
    })
  }

  addResource(){
    this.resource = this.resourceForm.value as Resource;
    this.resource.device_parent = this.device.id;
    this.DispositivoInyectado.addResource(this.resource).subscribe((resourceRecived)=>{
      this.resourceRecived = resourceRecived;
      this.device.resources_list.push(this.resourceRecived);
      this.resourceForm.reset();
    });
  }

  deleteResource(resource:Resource){
    this.DispositivoInyectado.deleteResource(resource.id).subscribe((response)=>{
      var index = this.device.resources_list.indexOf(resource,0);
      if (index > -1){
        this.device.resources_list.splice(index,1);        
      }
    });
    
  }

}
