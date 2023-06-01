import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/Modelos/Tarea';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {
  habilitar: boolean = true;
  tareas: Tarea[];

  constructor(
    private clienteService: ClientesService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getTareas().subscribe(
      tareas => this.tareas = tareas
    );
  }

  setHabilitar(){
    this.habilitar = (this.habilitar == true)? false: true;
  }
}
