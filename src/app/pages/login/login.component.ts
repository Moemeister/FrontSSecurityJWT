import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TOKEN_NAME } from 'src/app/_share/var.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  pass: string = '';
  uploadForm!: FormGroup;

  constructor(private router: Router, private loginService: LoginServiceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    sessionStorage.clear()

    this.uploadForm = this.formBuilder.group({
      username:[''],
      pass:['']
    })
  }

  login(){
    const formData = new FormData;

    this.uploadForm.get('username')?.setValue(this.username)
    this.uploadForm.get('pass')?.setValue(this.pass)

    formData.append('username',this.uploadForm.get('username')?.value)
    formData.append('pass',this.uploadForm.get('pass')?.value)

    this.loginService.generateToken(formData).subscribe(data => {

      if(data){
        sessionStorage.setItem(TOKEN_NAME, data);
        this.router.navigate(['/home'])
      }
    })
    
  }

}
