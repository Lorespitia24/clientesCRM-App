import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Modelos/Cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';
import swal  from 'sweetalert2'

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  public cliente: Cliente = new Cliente()
  public nuevoContactoTitulo: string = "Nuevo Contacto"
  public editarContactoTitulo: string = "Editar Contacto"
  private errores: string[];
  public origen: string[];
  public tipoContacto: string[];


  constructor(
    private clienteService : ClientesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getOrigen().subscribe(
      origen => this.origen = origen
    );
    this.clienteService.getTipoContacto().subscribe(
      tipoContacto => this.tipoContacto = tipoContacto
    );
    this.cargarCliente()
  }

  public create():void{
    console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['clientes'])
        swal.fire('Nuevo Contato', `Cotacto ${cliente.nombre} ${cliente.apellido} creado con exito!`,'success')
      }, 
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors)
      }
      );
  }

  cargarCliente():void{
    this.activateRoute.params.subscribe(
      params => {
        let id = params['idCliente']
        if(id){
          this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
        }
      }
    )
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['clientes'])
        swal.fire('Actualización', `Contacto ${cliente.nombre} ${cliente.apellido} actualizado con exito!`,'success')
      }, 
        err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors)
      }
    )
  }

  compararObjeto(o1:string,o2:string){
    console.log(o1)
    return o1 === null || o2 === null? false:o1 === o2;

  }

}
