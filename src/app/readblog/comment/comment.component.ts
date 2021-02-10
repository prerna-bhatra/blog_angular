import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('showVar') showVar: any;
  constructor() { }

  ngOnInit(): void {
    console.log("show comp",this.showVar)
  }

  CloseCommentComponent()
  {
    console.log("close comment comp before update",this.showVar)
    this.showVar=false
    console.log("after update")
    console.log("varible update",this.showVar)
  }


}
