import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {IESignup} from './signup'
import {ConfigService} from '../app/config.service'


@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  constructor( private router: Router,private SignUpService:ConfigService){}

  form=new FormGroup({
    username:new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=.\d)[A-Za-z\d]{8,12}/)
    //  Validators.nullValidator
     
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ])
   
  });

  signupApi()
  {
    console.log("signup ")
    var signupValue=new IESignup()
    signupValue.name=this.form.value.username
    signupValue.email=this.form.value.email
    signupValue.password=this.form.value.password
    this.SignUpService.signup(signupValue)
    .subscribe(data=>{
      console.log("success",typeof(data))
     alert("successfully signup ")
     this.router.navigate(['/login'])
    },
    err=>{
    //console.log(err)
     alert("email already exists")
    },
    ()=>console.log("request finish")
    )
    
   // new ClientJS.getFingerprint()
   console.log("User data",signupValue)

  }


  get username()
  {
    return this.form.get('username')
  }
  get email()
  {
    return this.form.get('email')
  }
  get password()
  {
    return this.form.get('password')
  }


}

