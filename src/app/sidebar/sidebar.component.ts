import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UtilsServices } from '../services/utils.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authSvc: AuthService, private utilsSvc: UtilsServices){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onExit(): void{
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false);
  }

}
