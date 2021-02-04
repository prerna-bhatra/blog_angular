import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../config.service'
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

  constructor(private http:HttpClient,private trendService:ConfigService,private NewBlogService:ConfigService,private RestBlogService:ConfigService) { }

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
  alert()
  {
    console.log("click")
  }

}
