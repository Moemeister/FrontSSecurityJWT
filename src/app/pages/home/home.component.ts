import { Component, OnInit } from '@angular/core';
import { TOKEN_NAME } from 'src/app/_share/var.constants';
import jwt_decode from 'jwt-decode'
import { LoginServiceService } from 'src/app/service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje: string = '';

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void { 
    
    console.log(this.loginService.isLogged());
    
    this.loginService.welcome(sessionStorage.getItem(TOKEN_NAME)).subscribe(data => {
      this.mensaje = data;
    })

  }

}
