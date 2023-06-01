import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ClienteFormComponent } from './componentes/clientes/cliente-form/cliente-form.component';
import { ClienteListComponent } from './componentes/clientes/cliente-list/cliente-list.component';
import { ClientesService } from './servicios/clientes.service';
import { TareasFormComponent } from './componentes/tareas/tareas-form/tareas-form.component';
import { TareasListComponent } from './componentes/tareas/tareas-list/tareas-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ClienteFormComponent,
    ClienteListComponent,
    TareasFormComponent,
    TareasListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
