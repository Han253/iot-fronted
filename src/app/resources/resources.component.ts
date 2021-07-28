import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../models/device';
import { Property } from '../models/property';
import { Resource } from '../models/resources';
import { DeviceService } from '../services/device.service';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  deviceTag:string;
  resourceTag:string;
  resource:Resource = new Resource();
  propertyForm: FormGroup;
  property:Property = new Property();
  propertyReceived:Property = new Property();
  propertyBeforeUpdate:Property = new Property();
  updateProp:boolean = false;
  updatePropId:number = 0;

  constructor(private fbGenerator: FormBuilder,private route: Router,private RutaActiva: ActivatedRoute, private ResourceInyectado: ResourceService) { }

  ngOnInit(): void {
    this.deviceTag = this.RutaActiva.snapshot.params.tagdevice;
    this.resourceTag = this.RutaActiva.snapshot.params.tagresource;
    this.ResourceInyectado.getResource(this.resourceTag).subscribe((resourceRecived)=>{
      this.resource = resourceRecived;
    });

    this.propertyForm = this.fbGenerator.group({
      name:['',Validators.required],
      value:['',Validators.required],
      description:['']
    });

  }

  backDevice(){
    this.route.navigate(['/devices/detail/'+this.deviceTag]);
  }

  addProperty(){
    this.property = this.propertyForm.value as Property;
    this.property.resource_parent = this.resource.id;

    if(this.updateProp){
      this.property.id = this.updatePropId;
      this.ResourceInyectado.updateProperty(this.property).subscribe((propertyRecived)=>{
        var index = this.resource.properties_list.indexOf(this.propertyBeforeUpdate,0);
        this.resource.properties_list[index] = this.property;
      })
    } 
    else {
      this.ResourceInyectado.addProperty(this.property).subscribe((propertyRecived)=>{
        this.propertyReceived = propertyRecived;
        this.resource.properties_list.push(this.propertyReceived);
        this.propertyForm.reset();
      });
    };
    
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
    this.ResourceInyectado.deleteProperty(property.id).subscribe((response)=>{
      var index = this.resource.properties_list.indexOf(property,0);
      if (index > -1){
        this.resource.properties_list.splice(index,1);
      }      
    })
  }



}
