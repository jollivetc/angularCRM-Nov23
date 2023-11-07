import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(){
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), no$InPassword])
    } )
  }
  onSubmit():void{
    console.log(this.loginForm)
  }
}

function no$InPassword(component:AbstractControl):ValidationErrors|null{
  if((component.value as string).indexOf('$')<0){
    return null;
  }else{
    return {no$InPassword:true}
  }
}
