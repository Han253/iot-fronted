import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';



const BASE_URL: string = 'http://192.168.0.125:8090';

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

  addDevice(device: Device): Observable<Device>{
    return this.http.post<Device>(BASE_URL+'/device',device)
  }

  updateDevice(device: Device){
    return this.http.put<Device>(BASE_URL+'/device/tag/'+device.tag, device)
  }

  deleteDevice(tag: string): Observable<any>{
    return this.http.delete<any>(BASE_URL+'/device/tag/'+tag)
  }

}
