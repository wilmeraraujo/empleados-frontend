import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl = "http://localhost:8091/api/v1/empleados";

  constructor(private httpClient : HttpClient) { }

  getListEmpleados():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}`);
  }
  getEmpleadoById(id: number): Observable<Empleado> {
    return this.httpClient.get<Empleado>(`${this.baseUrl}/${id}`);
  }
  registrarEmpleado(empleado:Empleado) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,empleado);
  }
  actualizarEmpleado(id:number,empleado:Empleado) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,empleado);
  }
  eliminarEmpleado(id:number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
