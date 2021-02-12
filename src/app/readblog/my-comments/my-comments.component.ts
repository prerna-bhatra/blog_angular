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

  HighLight(y:any,s:any,e:any)
  {
    console.log("click",e)
    const ele=document.getElementById("MainPara")
    // const MainParaEleArray=document.getElementsByTagName("p")
    console.log(ele)
    const MainParaEleArray=document.getElementsByTagName("p")
  //  console.log(MainParaEleArray)
    const textNode = ele.childNodes[0];
    scrollTo(0,(y))
    
    var MarkElement=document.getElementById('Mark')
    if(MarkElement==null)
    {
    const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
    console.log("mark tag",MarkElement,"tagname",mark)
    range.setStart(textNode, s);
    range.setEnd(textNode, e);
    mark.setAttribute("style", "background-color: yellow;");
    range.surroundContents(mark);

    }
    else{
      const MainParaEle=document.getElementsByTagName('mark')
      while(MainParaEle.length)
      {
        //range.selectNodeContents(mark)
     //window.getSelection().removeAllRanges();
        var parent = MainParaEle[ 0 ].parentNode;
       
       // console.log(parent)
        while( MainParaEle[ 0 ].firstChild ) {
          parent.insertBefore(  MainParaEle[ 0 ].firstChild, MainParaEle[ 0 ] );
      }
       parent.removeChild( MainParaEle[ 0 ] );
      }
      MainParaEleArray[0].normalize();
      const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
    console.log("mark tag",MarkElement,"tagname",mark)
    range.setStart(textNode, s);
    range.setEnd(textNode, e);
    mark.setAttribute("style", "background-color: yellow;");
    range.surroundContents(mark);
  }
  }

}
