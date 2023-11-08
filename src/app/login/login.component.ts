import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

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

constructor(private authentService:AuthenticationService){
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), no$InPassword])
    } )
  }
  onSubmit():void{
    const user:any = this.authentService.authentUser(this.loginForm.value.login,
                                                      this.loginForm.value.password)
    console.log(user);
  }
}

function no$InPassword(component:AbstractControl):ValidationErrors|null{
  if((component.value as string).indexOf('$')<0){
    return null;
  }else{
    return {no$InPassword:true}
  }
}
