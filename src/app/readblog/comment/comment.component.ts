import { Component, OnInit ,Input,EventEmitter, Output } from '@angular/core';
import {IEcomment}  from './comment'
import {ConfigService} from '../../config.service'
import { ActivatedRoute ,Params,Router } from "@angular/router";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('showVar') showVar: any;
  @Input('selectedTextInChild')selectedTextInChild:any
  @Input('StartOffsetInChild')StartOffsetInChild:any
  @Input('EndOffsetInChild')EndOffsetInChild:any
  @Input('Ycoordinator')Ycoordinator:any
  // @Input('BlogId')BlogId:any
  @Output() showvarUpdate = new EventEmitter();
  commentName:any
  SaveMode:any
  BlogId:any
  Token:any
  decoded:any

  constructor(private service:ConfigService,private router:ActivatedRoute,private route:Router) { }

   checkLogin()
  {
   console.log("login check")
     if(!localStorage.getItem('User'))
     {
       
      alert("please login to comment ")
       this.route.navigate(['/login'])
     
     }
     else{
      this.Token=JSON.parse(localStorage.getItem('User'))
      this.decoded=jwt_decode(this.Token);
     }
  }

  ngOnInit(): void {
    this.checkLogin()
    console.log("show comp",this.showVar)
    console.log("selcted text",this.selectedTextInChild)
    console.log("offsets",this.EndOffsetInChild,this.StartOffsetInChild)
    this.router.paramMap
    .subscribe(paramas=>
      {
        this.BlogId=paramas.get('blogId')

      })
  }

//   updateValue(val:any) {  
     
// }  

  CloseCommentComponent()
  {
    console.log("close comment comp before update",this.showVar)
    this.showVar=false
    console.log("after update")
    console.log("varible update",this.showVar)
    this.showvarUpdate.emit(this.showVar);
  }

  PublishComment($event:any)
  {
    // console.log($event.target)
    console.log("comment",this.commentName,"saveMode",this.SaveMode)
    const CommentData=new IEcomment()
    CommentData.CommentName=this.commentName
    CommentData.CommentPrivacy=this.SaveMode
    CommentData.HighlightTextRangeEndOffest=this.EndOffsetInChild
    CommentData.HighlightTextRangeStartOffest=this.StartOffsetInChild
    CommentData.HighlightTextYcordinator=this.Ycoordinator
    CommentData.BlogId= this.BlogId
    // console.log("BlogId", CommentData.BlogId)
    if(CommentData.CommentName===undefined ||  CommentData.CommentPrivacy===undefined)
    {
      alert("empty comment can not be created")
    }
    else{
      this.service.PublishComment(CommentData)
      .subscribe(res=>
        {
          // console.log("result",res)
          alert("comment created successfully")
          
        },
        err=>{
          // console.log(err)
          alert("comment not created ")
        })

    }

    // console.log("Comment Data",CommentData)
    
  }
}
