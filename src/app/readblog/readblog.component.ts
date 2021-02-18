import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,AfterViewInit, ElementRef,ViewChild} from '@angular/core';
import { ActivatedRoute ,Params,Router } from "@angular/router";
import {ConfigService} from '../config.service'
import { NavbarService } from '../navbar/navbar.service'
import {IEreadblogvalue,IEallComments,IEmyComments} from './readblog'



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
  StartOffset:any
  EndOffset:any
  MyCommentButton:any
  ShowAllComments:any=false
  ShowMycomments:any=false
  AllComments:any
  MyCommentsLength:any
  
  constructor(private router:ActivatedRoute,private route:Router , private Service:ConfigService,private http:HttpClient,public nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.ClearInput=' '
    // this.nav.HideSearch=!this.nav.HideSearch
    console.log("navbar input value",this.nav.ClearInput)
   
    this.router.paramMap
    .subscribe(paramas=>
      {
        var blogParam=new IEreadblogvalue()
        blogParam.BlogId=paramas.get('blogId')
        console.log( blogParam.BlogId)

        this.Service.ReadBlog(blogParam.BlogId)
        .subscribe(result=>{
          
          this.nav.ClearInput=' '
          this.nav.HideSearch=!this.nav.HideSearch
          console.log("result ",result)
          if(result.data){
            this.BlogData=result.data
            console.log("result from api",result.data)
            // console.log( this.maxLimit)

            //my comments length
            this.Service.ReadMyCommentsLn(blogParam.BlogId)
            .subscribe(CommenResult=>
              {
                console.log("my Comments length",CommenResult)
                this.MyCommentsLength=CommenResult
                console.log("lenght comments",this.MyCommentsLength)
              },
              err=>
              {
                console.log("error",err)
              })
            


          }
          else if(result.Login){
              this.maxLimit=true
              this.BlogData=result.Login
              // var CommentParam=new IEallComments()              
             // console.log( this.maxLimit)
              //alert(result.Login)
           // this.route.navigate(['/login'])
          }
          
         this.BlogImg=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${blogParam.BlogId}`
          // console.log( this.BlogImg)
          //console.log( this.BlogData)

        },
        err=>
        {
          alert(err)
          
        })
      })

      this.CheckLogin()

  }


  CheckLogin()
  {
    if(window.localStorage.getItem('User'))
    {
      this.MyCommentButton=true
    }
    else{
      this.MyCommentButton=false
    }
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
        this.StartOffset=window.getSelection().getRangeAt(0).startOffset
        this.EndOffset=window.getSelection().getRangeAt(0).endOffset

        console.log("offsets",this.StartOffset,this.EndOffset)
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

    //for closind the comment comp
    getUpdatedvalue($event:any) {  
      console.log($event);  
      this.showChildComponent = $event; 
      //for closing twitter and comment buttons 
      this.ShowButtonsOnSelection=false
  }  


      ShowAllcomments()
      {
        this.ShowAllComments=true
        this.ShowMycomments=false

        console.log("all",this.ShowAllComments,'my',this.ShowMycomments)

      }
      
      ShowMyComments()
      {
        this.ShowAllComments=false
        this.ShowMycomments=true
        console.log("all",this.ShowAllComments,'my',this.ShowMycomments)
      }

  
}




