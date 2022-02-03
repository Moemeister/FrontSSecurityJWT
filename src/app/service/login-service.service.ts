import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST, TOKEN_NAME } from '../_share/var.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(formData: FormData) : Observable<String>{
  
    return this.http.post<String>(`${HOST}/authenticate`, formData);
  }

  generateToken(request: any){
    return this.http.post<string>(`${HOST}/authenticate`, request, {
      responseType: 'text' as 'json'
    })
  }

  isLogged(){
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  welcome(token: any){
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>(`${HOST}/`, {
      headers,
      responseType: 'text' as 'json'
    });
  }
}
