import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import { Property } from '../models/property';
import { Resource } from '../models/resources';



const BASE_URL: string = 'http://localhost:8090';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  device:Device = new Device();

  constructor(private http: HttpClient) {
    
  }

  getDevices(): Observable<Device[]>
  {
    return this.http.get<Device[]>(BASE_URL+'/device')
  }

  getDevice(id:number): Observable<Device>{
    return this.http.get<Device>(BASE_URL+'/device/'+id)
  }

  addDevice(device: Device): Observable<Device>{
    return this.http.post<Device>(BASE_URL+'/device',device)
  }

  updateDevice(device: Device){
    return this.http.put<Device>(BASE_URL+'/device/'+device.id, device)
  }

  deleteDevice(id: number): Observable<any>{
    return this.http.delete<any>(BASE_URL+'/device/'+id)
  }

  addProperty(property:Property): Observable<Property>{
    return this.http.post<Property>(BASE_URL+'/property',property)
  }

  updateProperty(property:Property){
    return this.http.put<Property>(BASE_URL+'/property/'+property.id,property)
  }

  deleteProperty(id:number):Observable<any>{
    return this.http.delete<any>(BASE_URL+'/property/'+id)
  }

  addResource(resource:Resource): Observable<Resource>{
    return this.http.post<Resource>(BASE_URL+'/resource', resource)
  }

  updateResource(resource:Resource){
    return this.http.put<Resource>(BASE_URL+'/resource/'+resource.id,resource)
  }

  deleteResource(id:number):Observable<any>{
    return this.http.delete<any>(BASE_URL+'/resource/'+id)
  }

}
