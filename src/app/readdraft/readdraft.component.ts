import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params,Router } from "@angular/router";
import {FormsModule,ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms'
import {ConfigService} from '../config.service'
import {IEAdraft} from './readdraft'
import { isArray } from 'lodash';


@Component({
  selector: 'app-readdraft',
  templateUrl: './readdraft.component.html',
  styleUrls: ['./readdraft.component.css']
})
export class ReaddraftComponent implements OnInit {

  constructor(private router:ActivatedRoute,private route:Router , private Service:ConfigService) { }

  
  DraftData:any
  BlogData:any
  data = new FormData();
  TotalVersion:any
  VersionArr:any=[]
  LatestHeading:any
  LatestContent:any
  LatestImg:any
  FileName:any
  LatestDraftId:any
  

  ngOnInit(): void {
    this.router.paramMap
    .subscribe(paramas=>
      {
        var blogParam=new IEAdraft()
        blogParam.BlogId=paramas.get('blogId')
        // console.log("BlogId", blogParam.BlogId)
        this.Service.ReadADraft(blogParam.BlogId)
        .subscribe(result=>{
          // console.log(result)
         this.DraftData = result.data;
         console.log(isArray(this.DraftData));
         console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDdraftdata ",this.DraftData);
         this.formPopulate(blogParam);

          
        },
        err=>
        {
          console.log(err)
          alert("error occured")
        })
      }
    )    
  }

  form=new FormGroup({
    Heading:new FormControl('',[
     
    ]),
    Content:new FormControl('',[
      Validators.required,
    ]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [
      Validators.required]) 
  });
  
  
  onFileChange(event:any)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.FileName=file.name
      console.log(file)
      if(file.name.includes('png')  || file.name.includes('jpg') || file.name.includes('svg'))
      {
        this.form.patchValue({
          fileSource: file
        });
        console.log(this.form.value.fileSource)
        // this.LatestHeading=this.form.value.fileSource
      }
      else{
        this.form.patchValue({
          fileSource: null
        });
        console.log(this.form.value.fileSource)
        alert("only image file allowed")
      }
      
    }
  }


  PublishDraft(){
    var DraftParam=new IEAdraft()
    DraftParam.DraftId=this.LatestDraftId
    console.log("DraftiD HEY HEY",DraftParam.DraftId)
    if(DraftParam.DraftId===undefined)
    {
      DraftParam.DraftId=0
    }
    this.data.append('BlogImg',this.form.get('fileSource').value)
    console.log("heading and content",this.form.value.Heading,this.form.value.Content)
    this.data.append("BlogHeading",this.form.value.Heading)
    this.data.append('BlogContent',this.form.value.Content)
    // this.data.append("DummyId",DraftParam.DraftId)
    // console.log(this.data)
    
    
    this.router.paramMap
    .subscribe(paramas=>
      {
       DraftParam.BlogId=paramas.get('blogId')
       this.Service.PublishDraft( DraftParam.BlogId, DraftParam.DraftId,this.data)
       .subscribe(PublishedDraftData=>
        {
          console.log("PublishedDraftData",PublishedDraftData)

        },
        err=>
        {
          console.log("PublishedDraftData",err)
        })
      })
  }


//when create draft is clicked
  CreateDraft()
  {
    var DraftParam=new IEAdraft()
    DraftParam.DraftId=this.LatestDraftId
    console.log('img',this.form.get('fileSource').value)
    
    this.data.append('EditedImg',this.form.get('fileSource').value)
    this.data.append("EditedHeading",this.form.value.Heading)
    this.data.append('EditedContent',this.form.value.Content)
    this.data.append("DummyId",DraftParam.DraftId)
    

    // console.log("data of form",this.data)


    // this.Service.CreateDraft()

      
      
       console.log("Latest id",this.LatestDraftId,"DraftId", DraftParam.DraftId)
       
       this.router.paramMap
       .subscribe(paramas=>
         {
           
          DraftParam.BlogId=paramas.get('blogId')
           this.Service.CreateDraft( DraftParam.BlogId,this.data)
         .subscribe(res=>
          {
              console.log("create Draft",res)
          },
          err=>
          {
              console.log("error create drfat",err)
          })

         })
       
       

  }

  //click on version 0
  ClickVersion0()
  {
    //image change will be handled by backend if image is not choosen 
    this.form.patchValue({ Heading: this.BlogData.data.BlogHeading ,Content:this.BlogData.data.BlogContent });
    console.log("LALALAL",this.BlogData.data._id)
    this.LatestImg=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${this.BlogData.data._id}`
  }

  
  ClickAnyExcept0Vesion(DraftId:any,DraftHeading:any,DraftContent:any)
  { 
    // console.log(value)
     //image change will be handled by backend if image is not choosen 
     this.LatestDraftId=DraftId
    this.form.patchValue({ Heading: DraftHeading ,Content:DraftContent });
    this.LatestImg=`https://desolate-sierra-34755.herokuapp.com/api/EditDraftimg/${DraftId}`

  }


  //shwoing latest values in form
  formPopulate(blogParam: any) {
      this.Service.ReadBlog(blogParam.BlogId)
         .subscribe(blogResult=>
          {
              this.BlogData=blogResult

              console.log("Blog Data", this.BlogData)

              if(this.DraftData.length===0)
              {
                console.log('no additional version')
                 this.LatestHeading=this.BlogData.data.BlogHeading
                 this.LatestContent=this.BlogData.data.BlogContent
                 this.LatestImg=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${this.BlogData.data._id}`
                 console.log("latest Values",this.LatestHeading,this.LatestContent,this.LatestImg)
              }
              else{
                console.log("addititonal version")
                this.LatestDraftId=this.DraftData[this.DraftData.length-1]._id
               this.LatestHeading=this.DraftData[this.DraftData.length-1]. EditedHeading
               this.LatestContent=this.DraftData[this.DraftData.length-1].EditedContent
               this.LatestImg=`https://desolate-sierra-34755.herokuapp.com/api/EditDraftimg/${this.DraftData[this.DraftData.length-1]._id}`
              }

              //showing latest value in form 
              this.form.patchValue({ Heading: this.LatestHeading ,Content:this.LatestContent });

             console.log("latest Values",this.LatestHeading,this.LatestContent,this.LatestImg)

          },
          err=>
          {
            console.log("blog",err)
          })
  }


}






