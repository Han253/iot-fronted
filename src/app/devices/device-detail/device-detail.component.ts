import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/models/device';
import { Property } from 'src/app/models/property';
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
  propertyForm: FormGroup;
  //To add and update properties
  property:Property = new Property();
  //For created property response
  propertyRecived:Property = new Property();
  //For save property before update status.
  propertyBeforeUpdate:Property = new Property();
  //For add/update property form.
  updateProp:boolean = false;
  //For save property id before update. 
  updatePropId:number=0;

  resourceForm: FormGroup;
  //To add and update Resources
  resource:Resource = new Resource();
  //To created resource response
  resourceRecived:Resource = new Resource();
  //For save resource before update status.
  resourceBeforeUpdate:Resource = new Resource();
  //For add/update resource form.
  updateReso:boolean = false;
  //For save resource id before update.
  updateResoId:number = 0; 


  constructor(private fbGenerator: FormBuilder, private DispositivoInyectado: DeviceService, private route: Router,private RutaActiva: ActivatedRoute) { }

  

  ngOnInit(): void {
    this.deviceTag = this.RutaActiva.snapshot.params.tag;
    this.DispositivoInyectado.getDevice(this.deviceTag).subscribe((deviceResponse)=>{
        this.device = deviceResponse;
        this.DispositivoInyectado.device = deviceResponse;
    });

    this.propertyForm = this.fbGenerator.group({
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

  

  addProperty(){
    this.property = this.propertyForm.value as Property;
    this.property.device_parent = this.device.id;

    if(this.updateProp){
      this.property.id = this.updatePropId;
      this.DispositivoInyectado.updateProperty(this.property).subscribe((propertyRecived)=>{
        var index = this.device.properties_list.indexOf(this.propertyBeforeUpdate,0);
        this.device.properties_list[index] = this.property;
      })
    } 
    else {
      this.DispositivoInyectado.addProperty(this.property).subscribe((propertyRecived)=>{
        this.propertyRecived = propertyRecived;
        this.device.properties_list.push(this.propertyRecived);
        this.propertyForm.reset();
      });
    };
    
  }

  addPropertyModal(){
    this.propertyForm.reset();
    this.updateProp = false;    
  }

  updatePropertyModal(property:Property){
    this.updateProp = true;
    this.updatePropId = property.id;
    this.propertyBeforeUpdate = property;
    this.propertyForm.patchValue({
      name:property.name,
      value:property.value,
      description:property.description
    });
  }

  deleteProperty(property:Property){
    this.DispositivoInyectado.deleteProperty(property.id).subscribe((response)=>{
      var index = this.device.properties_list.indexOf(property,0);
      if (index > -1){
        this.device.properties_list.splice(index,1);
      }      
    })
  }

  

  addResource(){
    this.resource = this.resourceForm.value as Resource;
    this.resource.device_parent = this.device.id;

    if(this.updateReso){
      this.resource.id = this.updateResoId;
      this.DispositivoInyectado.updateResource(this.resource).subscribe((resouceRecived)=>{
        var index = this.device.resources_list.indexOf(this.resourceBeforeUpdate,0);
        this.device.resources_list[index] = this.resource;
      })

    } else {    
      
      this.DispositivoInyectado.addResource(this.resource).subscribe((resourceRecived)=>{
        this.resourceRecived = resourceRecived;
        this.device.resources_list.push(this.resourceRecived);
        this.resourceForm.reset();
      });
    }
  }

  addResourceModal(){
    this.resourceForm.reset();
    this.resourceForm.patchValue({
      resource_type:"SENSOR"
    });
    this.updateReso = false;
  }

  updateResourceModal(resource:Resource){
    this.updateReso = true;
    this.updateResoId = resource.id;
    this.resourceBeforeUpdate = resource;
    this.resourceForm.patchValue({
      tag:resource.tag,
      name:resource.name,
      resource_type:resource.resource_type,
      description:resource.description
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

  passResource(resource:Resource){
    this.route.navigate(['/resource/'+this.device.tag+'/'+resource.tag])
  }

}
