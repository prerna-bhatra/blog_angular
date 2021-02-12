import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {IEtrendingBlogs,IEnewBlogs,IErestBlogs,IEsearchitem} from './home/home'
import {IElogin} from './login-form/login'
import {IESignup} from '../signup-form/signup'
import {IEBlog} from './write-blog/writeblog'
import {IEreadblogvalue} from './readblog/readblog'
import {IEMyBlog} from './myblog/myblog'
import {IEdraft} from './draft/draft'
import {IEcomment} from './readblog/comment/comment'
import {IEallComments} from './readblog/all-comments/all-comments'
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';


//import { fingerprint } from '@angular/compiler/src/i18n/digest';

declare var ClientJS: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fingerprint:any= new ClientJS().getFingerprint()
  Token:any
  decoded :any;
  //jwt_decode(this.Token);
  UserId:any

  constructor(private http: HttpClient) { }
  configUrl = 'assets/config.json';
  

  getToken()
  {
    if(!localStorage.getItem('User'))
     {
       
      
     }
     else{

      this.Token=JSON.parse(localStorage.getItem('User'))
      this.decoded=jwt_decode(this.Token);
      console.log("service",this.decoded)
     }
  }
  
    
  FetchTrendingBlogs(): Observable<IEtrendingBlogs[]>{
    return this.http.get<IEtrendingBlogs[]>(`https://desolate-sierra-34755.herokuapp.com/api/ShowTrendingBlog`)
  }

  FetchNewBlogs(): Observable<IEnewBlogs[]>{
    return this.http.get<IEnewBlogs[]>(`https://desolate-sierra-34755.herokuapp.com/api/ShowNewBlog`)
  }

  FetchRestBlogs(): Observable<IErestBlogs[]>{

    return this.http.get<IErestBlogs[]>(`https://desolate-sierra-34755.herokuapp.com/api/blogs`)
  }

  login(LoginCredentials:IElogin):Observable<any>{
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/signin/${this.fingerprint}`,LoginCredentials)
  }

  signup(SigupCredentials:IESignup):Observable<any>{
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/signup`,SigupCredentials)
  }
  
  signout(){

    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/signout/${this.fingerprint}`)
  }



  WriteBlog(FormData:IEBlog):Observable<any>{
    this.getToken()
    console.log("decode value",this.decoded)
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/blog/${this.decoded.payLoad._id}`,FormData)
  }

  ReadBlog(blogId:IEreadblogvalue):Observable<any>{
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/ReadBlog/${blogId}/${this.fingerprint}`,{})
  }

  // BlogImg(blogId:IEreadblogvalue):Observable<any>{
  //   return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${blogId}`)
  // }


  FetchMyBlog(): Observable<IEMyBlog[]>{
    this.getToken()
    return this.http.get<IEMyBlog[]>(`https://desolate-sierra-34755.herokuapp.com/api/MyBlogs/${this.decoded.payLoad._id}`)
  }


  SearchByTag(SearchItem:IEsearchitem):Observable<any>{
    console.log("searchitem in service",SearchItem.searchValue)
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/SearchByHashTag`,{hashtag: SearchItem.searchValue})
  }

  
  PublishComment(CommentData:IEcomment):Observable<any>{
    this.getToken()
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/comment/${this.decoded.payLoad._id}/${CommentData.BlogId}`,CommentData)
  }
  
  ReadAllComments(blogId:IEreadblogvalue):Observable<any>{
    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/comments/${blogId}`,{})
  }

  ReadMyComments(blogId:IEreadblogvalue):Observable<any>{
    this.getToken()
    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/MyComments/${this.decoded.payLoad._id}/${blogId}`,{})
  }

  // MyCommentsLn


  ReadMyCommentsLn(blogId:IEreadblogvalue):Observable<any>{
    this.getToken()
    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/MyCommentsLn/${this.decoded.payLoad._id}/${blogId}`,{})
  }

  
  ReadDraft():Observable<any>{
    this.getToken()
    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/drafts/${this.decoded.payLoad._id}`,{})
  }  

  

}
