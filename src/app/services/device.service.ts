import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  device:Device = new Device();

  constructor(private http: HttpClient) {
    
  }

  getDevices(): Observable<Device[]>
  {
    return this.http.get<Device[]>('http://192.168.0.125:8090/device')
  }

}
