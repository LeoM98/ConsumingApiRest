import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Cliente} from '../model/cliente';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/rest/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  saveCliente(cliente: Cliente): Observable<Cliente>{

    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(

      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar guardar cliente',
          text: e.error.mensaje
        });

        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(

      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar obtener cliente',
          text: e.error.mensaje
        });
        return throwError(e);

      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar actualizar cliente',
          text: e.error.mensaje
        });
        return throwError(e);

      })
    );
  }

  delete(id): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar eliminar cliente',
          text: e.error.mensaje
        });
        return throwError(e);

      })
    );
  }

}
