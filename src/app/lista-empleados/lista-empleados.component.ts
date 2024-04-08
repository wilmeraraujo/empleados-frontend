import { Component, OnInit } from '@angular/core';
import { Empleado } from './../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent implements OnInit{

  empleados:Empleado[];

  constructor(private empleadoServicio:EmpleadoService,private router:Router){}
  ngOnInit(): void {
    this.getEmpleados();
  }
  
  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  eliminarEmpleado(id:number){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Confirmar si desea eliminar el empleado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText:"No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoServicio.eliminarEmpleado(id).subscribe(dato =>{
          this.getEmpleados();
        })
        Swal.fire({
          title: "Eliminado!",
          text: "El empleado fue eliminado satisfactoriamente.",
          icon: "success",
          showConfirmButton: true,
          timer: 2000
        });
      }
    });
      
  }
  
  obtenerEmpleadoPorId(id:number){
    this.empleadoServicio.getEmpleadoById(id).subscribe(dato =>{
      this.getEmpleados();
    })
  }

  verDetallesEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);
  }
  
  private getEmpleados(){
    this.empleadoServicio.getListEmpleados().subscribe(dato =>{
      this.empleados= dato;
    })
  }

}
