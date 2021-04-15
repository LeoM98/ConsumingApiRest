import {Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// Componentes
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormularioComponent } from './cliente/formulario/formulario.component';


// Modulos primeNG
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';

// Servicios
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'form', component: FormularioComponent},
  {path: 'form/:id', component: FormularioComponent},
  {path: '', redirectTo: 'cliente', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FooterComponent,
    HeaderComponent,
    FormularioComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    TableModule,
    CardModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
