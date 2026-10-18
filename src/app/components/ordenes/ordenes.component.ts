import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './ordenes.component.html'
})
export class OrdenesComponent implements OnInit {
  usuarios: any[] = [];
  productos: any[] = [];
  ordenes: any[] = [];
  
  granTotal: number = 0;
  totalSmartphones: number = 0;

  nuevaOrden = {
    usuarioStr: '',
    productoStr: '',
    cantidad: 1,
    preciounitario: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsuarios().subscribe(res => this.usuarios = res);
    this.api.getProductos().subscribe(res => this.productos = res);
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.api.getOrdenes().subscribe(res => {
      this.ordenes = res.map(orden => ({
        ...orden,
        importeTotal: orden.cantidad * orden.preciounitario
      }));
      this.calcularTotales();
    });
  }

  calcularTotales() {
    this.granTotal = this.ordenes.reduce((acc, orden) => acc + orden.importeTotal, 0);

    this.totalSmartphones = this.ordenes
      .filter(orden => orden.producto.categoria === 'Smartphone')
      .reduce((acc, orden) => acc + orden.importeTotal, 0);
  }

  guardarOrden(form: any) {
    if (form.invalid) return;

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
        alert('Orden guardada');
        this.cargarOrdenes();
        form.reset();
      },
      error: () => alert('Error al guardar la orden')
    });
  }
}