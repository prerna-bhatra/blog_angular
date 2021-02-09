import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../config.service'
import {IEsearchitem} from './home'
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
  constructor(private http:HttpClient,private trendService:ConfigService,private NewBlogService:ConfigService,private RestBlogService:ConfigService,private SearchService:ConfigService) { }

  ngOnInit(): void {
      this.trendService.FetchTrendingBlogs()
      .subscribe((TrendBlogData=>
        {
          // this.TrendingBlogs=TrendBlogData
          // console.log("from service data", this.blogsTrend)
          this.FetchTrndBlogs(TrendBlogData)
        }))


        this.NewBlogService.FetchNewBlogs()
        .subscribe((NewBlogData=>
          {
            console.log(NewBlogData)
           this.FetchNewBlogs(NewBlogData)
          }))
          

          this.RestBlogService.FetchRestBlogs()
          .subscribe((RestBlogData=>
            {
              console.log(RestBlogData)
             this.FetchRestBlogs(RestBlogData)
            }))
  
  }

  FetchTrndBlogs(TrendBlogData:any)
  {
    this.TrendingBlogs=TrendBlogData.result
   // console.log("TrendingBlog",this.TrendingBlogs.result)
  }

  FetchNewBlogs(NewBlogData:any)
  {
    this.NewBlogs=NewBlogData.result
  }

  FetchRestBlogs(RestBlogData:any)
  {
    this.RestBlogs=RestBlogData.result
  }
  
  

  SearchTag($event:any)
  {
    let SendingData:IEsearchitem = {searchValue: ''};
   this.Searching=true
   let searchData = $event.target.value
   console.log(searchData);
   SendingData.searchValue=$event.target.value;
   console.log("search item",SendingData.searchValue)
    this.SearchService.SearchByTag(SendingData).pipe(
       debounceTime(5000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    )
    .subscribe(result=>{
      this.Searching=false
      this.LoadSearchApi=true
      console.log(result)
    },
    err=>{
      console.log(err)
    })
  }
  
  


}
