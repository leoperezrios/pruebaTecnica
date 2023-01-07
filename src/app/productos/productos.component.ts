import { Component, OnInit } from '@angular/core';
import { ProductosServices } from './productos.service';
import { User } from '../models/user.interface';
import { Producto } from './producto';

@Component({
  selector: 'app-root',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  userArray: User[] = [
    
  ];

  productos: any;

  constructor(public producto: ProductosServices) {}

  ngOnInit(){
    this.producto.getProductos().subscribe(
      (r) => { this.productos = r.productos; console.log(r.productos)},
      (e) => { console.log(e) }
    )
  }

  selectedProducto: Producto = new Producto();

  openEdit(product: Producto) {
    this.selectedProducto = product;
  }

  addOrEdit() {
    console.log("Seleccionado:: ",this.selectedProducto);
  }

  delete() {
    if (confirm('Confirma si quieres eliminarlo')) {
      console.log("Eliminar:: ",this.selectedProducto);
    }
  }
}
