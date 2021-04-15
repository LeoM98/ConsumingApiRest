import { Component, OnInit } from '@angular/core';
import {Cliente} from '../model/cliente';
import {ClienteService} from '../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  formCliente: FormGroup;
  constructor(private ac: ActivatedRoute, private fb: FormBuilder, private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.formCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.cargarCliente();
  }

  public saveCliente(): void {
    this.clienteService.saveCliente(this.cliente).subscribe(s => {
      this.router.navigate(['/cliente']);
      Swal.fire(
        'Guardado con éxito!',
        `El cliente ${this.cliente.nombre} ha sido guardado con éxito`,
        'success'
      );
    });
  }

  public cargarCliente(): void {
    this.ac.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          response => {
            this.cliente = response;
          }
        );
      }
    });
  }

  public updateCliente(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      response => {
        this.router.navigate(['/cliente']);
        Swal.fire(
          'Actualizado con éxito!',
          `El cliente ${this.cliente.nombre} ha sido actualizado con éxito`,
          'success'
        );
      }
    );
  }


  get nombre() {
    return this.formCliente.get('nombre');
  }

  get apellido() {
    return this.formCliente.get('apellido');
  }

  get email() {
    return this.formCliente.get('email');
  }

}
