import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  LoginCheck:boolean

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLogin()
    
  }

  checkLogin()
  {
   // console.log("login check")
     if(localStorage.getItem('User'))
     {
      this.LoginCheck=true
      
      //this.router.navigate([NavbarComponent]);
      
     }
     else{
       this.LoginCheck=false
     }
  }
 
}
