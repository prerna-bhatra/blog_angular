import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params,Router } from "@angular/router";
import {ConfigService} from '../../config.service'
import {IEmyComments} from './my-comments'

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit {

  comments:any
  constructor(private router:ActivatedRoute,private route:Router , private Service:ConfigService) { }

  ngOnInit(): void {
    this.router.paramMap
    .subscribe(paramas=>
      {
        var BlogParams=new IEmyComments()
        BlogParams.blogId=paramas.get('blogId')
              this.Service.ReadMyComments(BlogParams.blogId)
          .subscribe(CommenResult=>
            {
              console.log("All Comments",CommenResult)
              this.comments=CommenResult
              console.log("saved comments",this.comments)
            },
            err=>
            {
              console.log("error",err)
            })

        
      })



  }

}
