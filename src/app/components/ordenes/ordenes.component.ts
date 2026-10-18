import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, JsonPipe],
  templateUrl: './ordenes.component.html'
})
export class OrdenesComponent implements OnInit {
  usuarios: any[] = [];
  productos: any[] = [];
  ordenes: any[] = [];
  
  granTotal: number = 0;
  totalSmartphones: number = 0;
  mensajeError = '';
  mensajeExito = '';

  nuevaOrden = {
    usuarioStr: '',
    productoStr: '',
    cantidad: 1,
    preciounitario: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsuarios().subscribe({
      next: res => this.usuarios = res,
      error: () => this.mensajeError = 'No fue posible cargar los usuarios.'
    });
    this.api.getProductos().subscribe({
      next: res => this.productos = res,
      error: () => this.mensajeError = 'No fue posible cargar los productos.'
    });
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.api.getOrdenes().subscribe({
      next: res => {
        this.ordenes = res.map(orden => ({
          ...orden,
          importeTotal: orden.cantidad * orden.preciounitario
        }));
        this.calcularTotales();
      },
      error: () => this.mensajeError = 'No fue posible cargar las órdenes.'
    });
  }

  calcularTotales() {
    this.granTotal = this.ordenes.reduce((acc, orden) => acc + orden.importeTotal, 0);

    this.totalSmartphones = this.ordenes
      .filter(orden => orden.producto.categoria === 'Smartphone')
      .reduce((acc, orden) => acc + orden.importeTotal, 0);
  }

  guardarOrden(form: any) {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (form.invalid) {
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    const payload = {
      idorden: 0,
      usuario: JSON.parse(this.nuevaOrden.usuarioStr),
      producto: JSON.parse(this.nuevaOrden.productoStr),
      cantidad: this.nuevaOrden.cantidad,
      preciounitario: this.nuevaOrden.preciounitario,
      fecha: new Date().toISOString().split('T')[0]
    };

    this.api.crearOrden(payload).subscribe({
      next: () => {
        this.mensajeExito = 'Orden guardada correctamente.';
        this.cargarOrdenes();
        form.resetForm();
        this.nuevaOrden.usuarioStr = '';
        this.nuevaOrden.productoStr = '';
        this.nuevaOrden.cantidad = 1;
        this.nuevaOrden.preciounitario = 0;
      },
      error: () => this.mensajeError = 'No fue posible guardar la orden.'
    });
  }
}