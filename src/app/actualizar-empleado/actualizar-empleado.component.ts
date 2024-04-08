import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css'] // Se corrigió 'styleUrl' por 'styleUrls'
})
export class ActualizarEmpleadoComponent implements OnInit {
  id: number;
  empleado: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadoServicio: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleadoServicio.getEmpleadoById(this.id).subscribe(
      dato => {
        this.empleado = dato;
      },
      error => {
        console.error('Error al obtener el empleado:', error);
      }
    );
  }

  actualizarEmpleado() {
    
    this.empleadoServicio.actualizarEmpleado(this.id, this.empleado).subscribe(
      () => {
        this.irListaEmpleados();
      },
      error => {
        console.error('Error al actualizar el empleado:', error);
        // Puedes manejar el error de acuerdo a tus necesidades, por ejemplo, mostrar un mensaje de error al usuario.
      }
    );
    Swal.fire({
      title: "Actualizado!",
      text: "El empleado fue actualizado satisfactoriamente.",
      icon: "success",
      showConfirmButton: false,
      timer: 2500
    });
  }

  irListaEmpleados() {
    this.router.navigate(['/empleados']);
  }

  onSubmit() {
    this.actualizarEmpleado();
  }
}
