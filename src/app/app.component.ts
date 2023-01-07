import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosServices } from './productos/productos.service';
import { User } from './models/user.interface';
import { Producto } from './productos/producto';
import { UtilsServices } from './services/utils.services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
  opened = false;
  private destroy$ = new Subject<any>();

  userArray: User[] = [];

  productos: any;

  constructor(public producto: ProductosServices, private utilsSvc: UtilsServices) {}
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(){
    this.utilsSvc.sidebarOpened$
    .pipe(takeUntil(this.destroy$))
    .subscribe( (res: boolean) => (this.opened = res))
    
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
