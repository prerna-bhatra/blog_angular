import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,AfterViewInit, ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute ,Params,Router } from "@angular/router";
import {ConfigService} from '../config.service'
import {IEreadblogvalue} from './readblog'


@Component({
  selector: 'app-readblog',
  templateUrl: './readblog.component.html',
  styleUrls: ['./readblog.component.css']
})
export class ReadblogComponent implements OnInit {

  BlogData:any
  animal:any
  BlogImg:any
  maxLimit:boolean=false
  constructor(private router:ActivatedRoute,private route:Router , private ReadBlogService:ConfigService,private http:HttpClient,private BlogImgService:ConfigService) { }

  ngOnInit(): void {
    this.router.paramMap
    .subscribe(paramas=>
      {
        var blogParam=new IEreadblogvalue()
        blogParam.BlogId=paramas.get('blogId')
        console.log( blogParam.BlogId)

        this.ReadBlogService.ReadBlog(blogParam.BlogId)
        .subscribe(result=>{
          
          console.log("result ",result)
          if(result.data){
            this.BlogData=result.data
            console.log( this.maxLimit)
          }
          else if(result.Login){
              this.maxLimit=true
              this.BlogData=result.Login
             // console.log( this.maxLimit)
              //alert(result.Login)
           // this.route.navigate(['/login'])
          }
          
         this.BlogImg=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${blogParam.BlogId}`
          console.log( this.BlogImg)
          //console.log( this.BlogData)

        },
        err=>
        {
          alert(err)
          
        })
      })

  }

  listen()
  {
    var Textmsg= this.BlogData.BlogContent
 const utterance = new SpeechSynthesisUtterance(Textmsg);
  window.speechSynthesis.speak(utterance);
  }

  pause()
  {
    window.speechSynthesis.pause();
  }

  resume()
  {
    window.speechSynthesis.resume();
  }

  cancel()
  {
    window.speechSynthesis.cancel();
  }

}




