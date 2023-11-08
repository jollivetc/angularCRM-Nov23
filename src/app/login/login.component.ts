import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginErrors = {
      required : 'Missing login',
      minlength : 'more than 3 characters'
  }

constructor(private authentService:AuthenticationService, private router:Router){
  this.authentService.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), no$InPassword])
    } )
  }
  onSubmit():void{
    const user:any = this.authentService.authentUser(this.loginForm.value.login,
                                                      this.loginForm.value.password)
    if(user){
      this.router.navigateByUrl('/home');
    }
  }
}

function no$InPassword(component:AbstractControl):ValidationErrors|null{
  if((component.value as string).indexOf('$')<0){
    return null;
  }else{
    return {no$InPassword:true}
  }
}
