import { Component, OnInit ,Input,Output} from '@angular/core';
import { Location } from '@angular/common';
import {Router} from '@angular/router'
import {IEsearchitem} from './search/search'
import {ConfigService} from '../config.service'
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import {NavbarService} from './navbar.service'
import {GlobalVarible} from '../GlobalConstant'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  LoginCheck:boolean
  isUserLoggedIn: boolean;
  ShowSearchInput:boolean;
  ShowSearch:boolean=false
  SearchedData:any
  SearchOnEnter:any
  noDataFound:any
  

  
  constructor(private router: Router,private service:ConfigService,private location: Location,public nav: NavbarService) { 
    this.service.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });

  }

  ngOnInit(): void {
    console.log("NAVBAR")
    this.checkLogin()
    // console.log("comp", this.constructor.name)
    // console.log(this.location.path());
    let v=new GlobalVarible()
    // if(v.ShowSearchInputValue===false)
    // {
    //   v.ShowSearchInputValue=true
    // }
    this.ShowSearchInput=v.ShowSearchInputValue
     console.log("Global Varible",v.ShowSearchInputValue)
     
    
  }


  checkLogin()
  {
   console.log("login check")
     if(localStorage.getItem('User'))
     {
      this.isUserLoggedIn=true
      
     
      
     }
     else{
       this.isUserLoggedIn=false
       console.log("hello")
       this.router.navigate(['/login']);
     }
  }

  SignOutClick()
  {
    console.log("signout")
    this.service.signout()
    .subscribe(data=>{
      console.log("success",typeof(data))
     localStorage.removeItem("User");
     alert("successfully sigout ")
     this.service.isUserLoggedIn.next(false)
     this.router.navigate(['/'])
     
    },
    err=>{
    console.log(err)
     
    },
    ()=>console.log("request finish")
    )
  }

  showSearchResult($event:any)
  {
    this.nav.HideSearch=true
    this.SearchedData=''
    let SendingData:IEsearchitem = {searchValue: ''};
  //  this.Searching=true
   let searchData = $event.target.value
   console.log("input val",searchData);
   console.log("event keycode",$event.key)
   if(searchData.trim()=='')
   {
     console.log("search input is blank")
    //  this.Searching=false 
   }
   SendingData.searchValue=$event.target.value;
   console.log("search item",SendingData.searchValue)
    this.service.SearchByTag(SendingData).pipe(
       debounceTime(5000)
      // If previous query is diffent from current   
      , distinctUntilChanged()
      // subscription for response
    )
    .subscribe(result=>{
      // console.log('RRRRRRRRRRRR', result);
     
      if($event.key!='Enter')
      {
        console.log("result",result)
        this.SearchOnEnter=false
        console.log("result before enter",result)
        console.log("ohho")
        this.SearchedData=result.data.SearchedData
        console.log("PLEASE")
        console.log("store data", this.SearchedData)
        // this.LoadSearchApi=true
        // this.Searching=true 
        console.log("store data 2", this.SearchedData)
        
        console.log(result,"search result",this.SearchedData)
      }
      else if($event.key=='Enter')
      { 
        this.SearchOnEnter = true;
        this.SearchedData = result.data;
        console.log("search enter and result",this.SearchedData)
        if(this.SearchedData.length==0)
        {
          this.noDataFound=true
        }
        else{
          this.noDataFound=false
          
        }
        // console.log()
        
      }
    },
    err=>{
      console.log(err)
    }) 


  }
}
