import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = '/api/principal';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/usuario`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.url}/usuario`, usuario);
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/producto`);
  }

  getOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/orden`);
  }

  crearOrden(orden: any): Observable<any> {
    return this.http.post(`${this.url}/orden`, orden);
  }
}