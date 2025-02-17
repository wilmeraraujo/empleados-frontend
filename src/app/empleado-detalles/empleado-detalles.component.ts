import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import { subscribe } from 'diagnostics_channel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-detalles',
  templateUrl: './empleado-detalles.component.html',
  styleUrl: './empleado-detalles.component.css'
})
export class EmpleadoDetallesComponent implements OnInit{

  id:number;
  empleado:Empleado;
  constructor(private route:ActivatedRoute,private empleadoServicio:EmpleadoService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();
    this.empleadoServicio.getEmpleadoById(this.id).subscribe(dato =>{
      this.empleado = dato;
      Swal.fire({
        title: "Detalle del empleado",
        text: `${this.empleado.nombre} ${this.empleado.apellido}`,
        showConfirmButton: false,
        timer: 2000
      });
    })
  }


}
