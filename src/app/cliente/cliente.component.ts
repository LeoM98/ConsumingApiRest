import { Component, OnInit } from '@angular/core';
import {ClienteService} from './services/cliente.service';
import {Cliente} from './model/cliente';
import { LazyLoadEvent } from 'primeng/api';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];
  first = 0;
  rows = 10;

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response;
      }
    );
  }

  public delete(id: number){


    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(id).subscribe(
          response => {
            this.router.navigate(['/clientes']);

            Swal.fire(
              'Eliminado!',
              `El cliente ha sido eliminado!`,
              'success'
            );
            window.location.reload();
          }
        );

      }
    });

  }

}
