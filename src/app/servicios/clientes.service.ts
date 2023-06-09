import { Injectable } from '@angular/core';
import { Cliente } from '../Modelos/Cliente'; 
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { Tarea } from '../Modelos/Tarea';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlEndPoint:string = 'http://localhost:8090/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  //traer los contactos 
  getClientes(): Observable <any>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
     
   }

   getOrigen(): Observable <any>{
    return this.http.get<any[]>(this.urlEndPoint + '/origen')
   }

   getTipoContacto(): Observable <any>{
    return this.http.get<any[]>(this.urlEndPoint + '/tipoContacto')
  
}

getTareas(): Observable <any>{
  return this.http.get(this.urlEndPoint+ '/tareas/list').pipe(
    map(response => response as Tarea[])
  );
   
 }

   //crear Tarea
   crearTarea(tarea: Tarea) : Observable<Tarea>{
    return this.http.post<Tarea>(this.urlEndPoint +'/tareas/list', tarea, {headers: this.httpHeaders}).pipe(
      map((response : any) => response.cliente as Tarea),
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

   //crear 
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }
  //buscar
  getCliente(idCliente): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${idCliente}`).pipe(
      catchError(e => {
        this.router.navigate(['clientes'])
        console.error(e.error.mensaje)
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

//editar
  update(cliente:Cliente) : Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.idCliente}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  //borrar
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e=> {
        console.error(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }
 
}
