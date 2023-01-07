import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()

export class ProductosServices{
    private API_PRODUCTOS = "https://prueba-tecnica-idecide.azurewebsites.net/api/productos";

    constructor(public http: HttpClient) {}

    public getProductos():Observable<any>{
        return this.http.get(this.API_PRODUCTOS);
    }

}