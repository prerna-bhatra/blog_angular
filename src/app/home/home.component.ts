import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../config.service'
import {IEsearchitem} from './home'
import { NavbarService } from '../navbar/navbar.service'
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public blogsTrend:any
  TrendingBlogs:any
  NewBlogs:any
  RestBlogs:any
  Searching:boolean=false
  LoadSearchApi:boolean=false
  SearchingTag:any
  SearchedData:any
  noDataFound:Boolean
  SearchOnEnter:Boolean=false
  SearchedDataonEnter:any
  ImgUrl:any=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/`
  //fetch all images 
  TrendingBlogImgsArr:any=[]
  NewBlogImgArr:any=[]
  MoreBlogImgAr:any=[]
  constructor(private http:HttpClient,private service:ConfigService,public nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.show()
      this.service.FetchTrendingBlogs().subscribe((data: any)=>
      {
        this.TrendingBlogs = data.result; 
      });

      this.service.FetchNewBlogs().subscribe((data: any)=>
      {
        this.NewBlogs = data.result;
      });     

      this.service.FetchRestBlogs()
      .subscribe((data: any) =>
      {
        this.RestBlogs = data.result;
      });
  }
  
  SearchTag($event:any)
  {
    this.SearchedData=''
    let SendingData:IEsearchitem = {searchValue: ''};
   this.Searching=true
   let searchData = $event.target.value
   console.log("input val",searchData);
   console.log("event keycode",$event.key)
   if(searchData.trim()=='')
   {
     console.log("search input is blank")
     this.Searching=false 
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
        this.SearchOnEnter=false
        console.log("result before enter",result)
        console.log("ohho")
        this.SearchedData=result.data
        console.log("PLEASE")
        console.log("store data", this.SearchedData)
        this.LoadSearchApi=true
        this.Searching=true 
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


  SearchByEnter($event:any)
  {
    console.log('PASSS');
    let SendingData:IEsearchitem = {searchValue: ''};
    let searchData = $event.target.value;
    console.log(searchData);
    if(searchData.trim() === '')
    {
      this.SearchOnEnter = false; 
    } else {
      this.SearchOnEnter = true;
    }
    SendingData.searchValue=$event.target.value;
    // console.log("search item",SendingData.searchValue)
    this.service.SearchByTag(SendingData).subscribe(result => {
      if(result.data.length==0)
      {
        this.noDataFound = true;
      } else {
        console.log('HEHEYE');
        console.log("result on enter",result.data)
        console.log("HEY WHY ARE YOU NOT GETTING COPIED")
        this.SearchedDataonEnter=result.data
        console.log("after assgin")
        console.log("searched data",this.SearchedDataonEnter)
        this.noDataFound=false
      }
    },
    err=>{
      console.log(err)
    })
  }

}
