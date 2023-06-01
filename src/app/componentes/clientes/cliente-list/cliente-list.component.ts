import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Modelos/Cliente';
import { ClientesService } from 'src/app/servicios/clientes.service'; 
import swal  from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[];
  origen: any[];
  filtroBuscar:String = '';
  

  constructor(
    private clienteService: ClientesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  getFiltroContacto(filtro){
    this.clientes = this.clientes.filter(
     (contacto)=> (contacto.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()))
    )
    if(this.clientes.length === 0 || filtro === ''){
      this.ngOnInit()
    }
     
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Está Seguro?',
      text: `¿Seguro que desea eliminar al contacto ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.idCliente).subscribe(
          response =>{
            this.clientes = this.clientes.filter(clienteDelete => clienteDelete !== cliente)
            swal.fire(
              'Contacto Eliminado!',
              `Contacto ${cliente.nombre} ${cliente.apellido} eliminado con exito.`,
              'success'
              )
            })
          }
    })
  }

}
