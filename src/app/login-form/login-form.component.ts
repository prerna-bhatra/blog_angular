import { Component, OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms'
import {Router} from '@angular/router'
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component'
import {IElogin} from './login'
import {ConfigService} from '../config.service'


import 'clientjs';
import { from } from 'rxjs';

declare var ClientJS: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router,private loginService:ConfigService,private dataSharingService:ConfigService) { }
  fingerprint:any
  logindata:any
  isUserLoggedIn:any

  ngOnInit(): void {
    
    
  }
  form=new FormGroup({
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=.\d)[A-Za-z\d]{4,12}/)
    //  Validators.nullValidator
     
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.email
    ])
   
  });

  login()
  {
  
  }
  log(x:any)
  {
    console.log(x)
  }

   loginApi()
  {
    var loginVallue=new IElogin()
    loginVallue.email=this.form.value.email
    loginVallue.password=this.form.value.password
    this.loginService.login(loginVallue)
    .subscribe(data=>{
      console.log("success",typeof(data))
     localStorage.setItem('User',JSON.stringify( data.token));
     this.dataSharingService.isUserLoggedIn.next(true)
     //this.router.navigate([NavbarComponent]);
     
     this.router.navigate(['/'])
    },
    err=>{
     // console.log(err)
     alert("email or password wrong")
    },
    ()=>console.log("request finish")
    )
    
   // new ClientJS.getFingerprint()
   console.log("User Email",this.form.value.email)
  
 
    
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
