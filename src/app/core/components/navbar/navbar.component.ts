import { LoginService } from './../../../pages/login/shared/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(){
    console.log('mandou apagar as credenciais');
    this.loginService.logout();
  }

}
