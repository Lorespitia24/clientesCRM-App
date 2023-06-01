import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './componentes/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './componentes/clientes/cliente-form/cliente-form.component';
import { TareasFormComponent } from './componentes/tareas/tareas-form/tareas-form.component';
import { TareasListComponent } from './componentes/tareas/tareas-list/tareas-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClienteListComponent},
  {path: 'clientes/page/:page', component: ClienteListComponent},
  {path: 'clientes/form', component: ClienteFormComponent},
  //recibe id como parametro 
  {path: 'clientes/form/:idCliente', component: ClienteFormComponent},
  {path: 'clientes/tareas/list', component: TareasListComponent},
  {path: 'clientes/tareas/form', component: TareasFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
