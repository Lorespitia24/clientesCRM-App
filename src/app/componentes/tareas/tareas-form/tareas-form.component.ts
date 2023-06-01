import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/Modelos/Cliente';
import { Tarea } from 'src/app/Modelos/Tarea';
import { ClientesService } from 'src/app/servicios/clientes.service';
import swal  from 'sweetalert2'

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styleUrls: ['./tareas-form.component.css']
})
export class TareasFormComponent implements OnInit {
  public tarea: Tarea = new Tarea()
  public nuevaTitulo: string = "Nueva Tarea"
  public editarTitulo: string = "Editar Tarea"
  private errores: string[];
  clientes: Cliente[];
  evento:boolean = false;

  constructor(
    private clienteService : ClientesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
  
 
  public create():void{
    console.log(this.tarea)
    this.clienteService.crearTarea(this.tarea).subscribe(
      tarea => {
        this.router.navigate(['clientes/tareas/list'])
        swal.fire('Nueva tarea', `Tarea ${tarea.titulo} creada con exito!`,'success')
      }, 
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors)
      }
      );
  }


  update(){}

  onCheckboxChange(e) {
    console.log("Click "+this.evento)
    if(this.evento === false){
      e.target.checked = true
      this.evento = true
    }else{
      e.target.checked = false
      this.evento = false
    }
      // e.target.checked = true
  }
    
}
