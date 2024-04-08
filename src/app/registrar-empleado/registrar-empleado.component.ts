import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrl: './registrar-empleado.component.css'
})
export class RegistrarEmpleadoComponent implements OnInit {

  empleado : Empleado = new Empleado();

  constructor(private empleadoServicio:EmpleadoService,private router:Router){}
  
  ngOnInit():void{
  }
  crearEmpleado(){
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(dato =>{
        console.log(dato);
        this.irListaEmpleados();
      },error => console.log(error)
    );
    Swal.fire({
      title: "Registrado!",
      text: "Empleado registrado satisfactoriamente.",
      icon: "success",
      showConfirmButton: false,
      timer: 2500
    });
  }

  irListaEmpleados(){
    this.router.navigate(['/empleados']);
  }
  onSubmit(){
    this.crearEmpleado();
  }
}
