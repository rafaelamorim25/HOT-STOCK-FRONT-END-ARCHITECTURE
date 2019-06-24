import { LoginService } from './../shared/login.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.login(new User('rafaelamorimclash@gmail.com', 'mustanggt40'));
  }

}
