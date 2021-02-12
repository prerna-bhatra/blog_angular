import { Component, OnInit ,Input,Output } from '@angular/core';
import { ActivatedRoute ,Params,Router } from "@angular/router";
import {ConfigService} from '../../config.service'
import {IEallComments} from './all-comments'

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  comments:any
  constructor(private router:ActivatedRoute,private route:Router , private Service:ConfigService) { }

  ngOnInit(): void {
    this.router.paramMap
    .subscribe(paramas=>
      {
        var BlogParams=new IEallComments()
        BlogParams.blogId=paramas.get('blogId')
              this.Service.ReadAllComments(BlogParams.blogId)
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
