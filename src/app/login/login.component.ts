import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  loginErrors = {
      required : 'Missing login',
      minlength : 'more than 3 characters'
  }
  private subs:Subscription[]=[];

constructor(private authentService:AuthenticationService, private router:Router){
  this.authentService.disconnect();
    this.loginForm = new FormGroup({
      login: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), no$InPassword])
    } )
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }
  onSubmit():void{
    const subscription = this.authentService.authentUser(this.loginForm.value.login,
                                  this.loginForm.value.password).subscribe({
                                    next:(user:User)=> {
                                          this.router.navigateByUrl('/home');
                                    },
                                    error:(error:Error)=>alert(error.message),
                                    complete:()=>console.log('complete')
                                  });
    this.subs.push(subscription);
  }
}

function no$InPassword(component:AbstractControl):ValidationErrors|null{
  if((component.value as string).indexOf('$')<0){
    return null;
  }else{
    return {no$InPassword:true}
  }
}
