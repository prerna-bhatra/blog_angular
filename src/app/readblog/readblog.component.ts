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

  selectedText: string = '';
  ShowButtonsOnSelection:boolean
  TopPos:any
  LeftPos:any
  showChildComponent:any=false
  showVar:any=this.showChildComponent

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


  //get range of selcted text
  showSelectedText(e:any) {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
      if(text!='')
      {
        console.log("selcted text 2",text)
      this.ShowButtonsOnSelection=true
      console.log("mouse x",e.clientX);
      console.log(e.clientY);
      this.TopPos=e.clientY
      this.LeftPos=e.clientX 
        console.log(window.getSelection().getRangeAt(0))
      }
      if(text=='')
      {
        this.ShowButtonsOnSelection=false
      }
      

    }
    this.selectedText = text;

   // console.log(this.selectedText)
  }

    shareTwitter()
    {
    const selectedText =  this.selectedText
    console.log("twitter",selectedText)
    if (selectedText != "") {
      window.open('https://twitter.com/intent/tweet?text='+encodeURI(selectedText) + '&url=' + encodeURI(document.URL));
    }
    }


    ClickCommentComp()
    {
      // console.log("click befor",  this.showChildComponent)
        this.showChildComponent=true
        // console.log("after",  this.showChildComponent)
    }

  
}




