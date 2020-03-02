import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public username;
  public password;
  public isLoading: boolean;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  async login() {
    this.isLoading = true;
    await this.authService.login(this.username, this.password);
    this.isLoading = false;
  }
}
