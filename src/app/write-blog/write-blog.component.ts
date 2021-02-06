import { Component, OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule,FormGroup,FormControl,Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {ConfigService} from '../config.service'
import { HttpClient } from '@angular/common/http';
import { IEBlog } from './writeblog';
import { fromEventPattern } from 'rxjs';


@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {

  userData=JSON.parse(localStorage.getItem('User'))
   data = new FormData();
  constructor(private router:Router,private WriteBlogService:ConfigService,private http: HttpClient) { 
  //console.log(this.userId.user)
  }

  


  HashTagsArr:any

  ngOnInit(): void {
    this.checkLogin()
  }

  checkLogin()
  {
   console.log("login check")
     if(!localStorage.getItem('User'))
     {
       
      this.router.navigate(['/login'])
     }
     else{

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
      this.form.patchValue({
        fileSource: file
      });
      console.log(this.form.value.fileSource)
    }

  }

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
   //console.log(this.form.value.HashTag)
   this.HashTagsArr=[...this.form.value.HashTag.split("#")]

   //console.log(this.form.get('fileSource').value)
   
   this.data.append('BlogImg',this.form.get('fileSource').value)
   this.data.append('BlogHeading',this.form.value.Heading)
   this.data.append('BlogContent',this.form.value.Content)
    this.data.append('UserId',this.userData.user._id)
    this.data.append('UserName',this.userData.user.name)
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


}
