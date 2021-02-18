import { Component, OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {ConfigService} from '../config.service'
import { HttpClient } from '@angular/common/http';
import { IEBlog } from './writeblog';
import { fromEventPattern } from 'rxjs';
import {GlobalVarible} from '../GlobalConstant'
import { NavbarService } from '../navbar/navbar.service'
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {

 
   data = new FormData();
   FileName:string=''
  constructor(private router:Router,private WriteBlogService:ConfigService,private http: HttpClient, public nav: NavbarService) { 
  //console.log(this.userId.user)
  }

  HashTagsArr:any
  Token:any
  decoded:any

  ngOnInit(): void {
    this.checkLogin()
    this.nav.hide()
    let v=new GlobalVarible()
    v.ShowSearchInputValue=false

    console.log("in write comp",v.ShowSearchInputValue)
    
  }

  checkLogin()
  {
   console.log("login check")
     if(!localStorage.getItem('User'))
     {
       
      this.router.navigate(['/login'])
     }
     else{

      this.Token=JSON.parse(localStorage.getItem('User'))
      this.decoded=jwt_decode(this.Token);
     }
  }

  form=new FormGroup({
    Heading:new FormControl('',[
     
    ]),
    Content:new FormControl('',[
      Validators.required,
    ]),
    SaveMode:new FormControl('',[
      Validators.required,
    ]),
    HashTag:new FormControl('',[
      
    ]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [
      Validators.required]) 
  });


  onFileChange(event:any) {
  
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
//hashtag
  addThis(a:any)
  {
    //console
    var b= a.target.value.replace('#',''); 
    a.value = '#'+b
    
    if (a.target.value.indexOf(' '))
    {
    a.target.value = a.target.value.replace(' ','#');
    }
  }

  submitBlog()
  {

    // console.log("filename",this.FileName,"type",typeof(this.FileName))
    if(this.FileName.includes('png')  || this.FileName.includes('jpg') || this.FileName.includes('svg'))
    {
      
    console.log("decode",this.decoded.payLoad._id)
    let UserId=this.decoded.payLoad._id
    let  UserName=this.decoded.payLoad.name
   console.log(this.form.value.HashTag)
   this.HashTagsArr=[...this.form.value.HashTag.split("#")]

   //console.log(this.form.get('fileSource').value)
   
   this.data.append('BlogImg',this.form.get('fileSource').value)
   this.data.append('BlogHeading',this.form.value.Heading)
   this.data.append('BlogContent',this.form.value.Content)
    this.data.append('UserId',UserId)
    this.data.append('UserName',UserName)
    this.data.append('hashTags',this.HashTagsArr)
    this.data.append('SaveMode',this.form.value.SaveMode)
    console.log("formdata",this.data)
   
    this.WriteBlogService.WriteBlog(this.data)
    .subscribe(result=>{
      //console.log("success",result,typeof(result))
      alert("blog created succefully")
      
    },
    err=>{
     //console.log(err)
     alert("something went wrong")
    },
    ()=>console.log("request finish")
    )
  }  
  else{
    alert("Please choose image file only")
  }
 }
}