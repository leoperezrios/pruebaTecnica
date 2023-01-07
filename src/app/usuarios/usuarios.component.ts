import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['rol', 'estado', 'google', 'nombre', 'correo', 'uid'];
  dataSource = new MatTableDataSource();

  
  ngOnInit(): void {
    this.userSvc.getAll().subscribe((users)=> {
      
      this.dataSource.data = users.usuarios;
    });
  }
  
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private userSvc: UserService) {}



  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
  }

}
