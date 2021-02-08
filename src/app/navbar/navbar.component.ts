import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {ConfigService} from '../config.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  LoginCheck:boolean
  isUserLoggedIn: boolean;

  constructor(private router: Router,private SignouService:ConfigService,private dataSharingService:ConfigService) { 
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });

  }

  ngOnInit(): void {
    this.checkLogin()
    
  }


  checkLogin()
  {
   console.log("login check")
     if(localStorage.getItem('User'))
     {
      this.isUserLoggedIn=true
      
      //this.router.navigate([NavbarComponent]);
      
     }
     else{
       this.isUserLoggedIn=false
       console.log("hello")
     }
  }

  SignOutClick()
  {
    console.log("signout")
    this.SignouService.signout()
    .subscribe(data=>{
      console.log("success",typeof(data))
     localStorage.removeItem("User");
     alert("successfully sigout ")
     this.dataSharingService.isUserLoggedIn.next(false)
     this.router.navigate(['/'])
     
    },
    err=>{
    console.log(err)
     
    },
    ()=>console.log("request finish")
    )
  }
 
}
