import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_NAME } from '../_share/var.constants';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  username: string = '';

  constructor(private loginService: LoginServiceService, private router: Router) { }

  canActivate(){
    let response = this.loginService.isLogged();
    if(!response){
      sessionStorage.clear();
      this.router.navigate(['login'])
      return false;
    }else{
      return true;
    }
  }
}
