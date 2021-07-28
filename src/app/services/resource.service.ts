import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
import { Resource } from '../models/resources';

const BASE_URL: string = 'http://192.168.0.125:8090';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  resource:Resource = new Resource();

  constructor(private http: HttpClient) { }

  getResource(tag:string): Observable<Resource>{
    return this.http.get<Resource>(BASE_URL+'/resource/tag/'+tag)
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

  
}
