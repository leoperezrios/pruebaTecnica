import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosServices } from './productos/productos.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriasComponent } from './categorias/categorias.component';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { CheckLoginGuard } from './guards/check-login.guard';
import { UtilsServices } from './services/utils.services';
import { AdminInterseptor } from './interseptors/admin-interseptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    UsuariosComponent,
    NavbarComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: ProductosComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'categoria', component: CategoriasComponent },
      { path: 'users', component: UsuariosComponent },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
          canActivate: [CheckLoginGuard],
      },
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
  ],
  providers: [
    ProductosServices,
    UtilsServices,
    {provide: HTTP_INTERCEPTORS, useClass: AdminInterseptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
