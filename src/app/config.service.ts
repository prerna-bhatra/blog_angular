import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {IEtrendingBlogs,IEnewBlogs,IErestBlogs} from './home/home'
import {IElogin} from './login-form/login'
import {IESignup} from '../signup-form/signup'
import {IEBlog} from './write-blog/writeblog'
import {IEreadblogvalue} from './readblog/readblog'
import {IEMyBlog} from './myblog/myblog'
import { BehaviorSubject } from 'rxjs';

//import { fingerprint } from '@angular/compiler/src/i18n/digest';

declare var ClientJS: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fingerprint:any= new ClientJS().getFingerprint()
  UserId=JSON.parse(localStorage.getItem('User'))

  constructor(private http: HttpClient) { }
  configUrl = 'assets/config.json';
  
    
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
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/blog/${this.UserId.user._id}`,FormData)
  }

  ReadBlog(blogId:IEreadblogvalue):Observable<any>{
    return this.http.post(`https://desolate-sierra-34755.herokuapp.com/api/ReadBlog/${blogId}/${this.fingerprint}`,{})
  }

  BlogImg(blogId:IEreadblogvalue):Observable<any>{
    return this.http.get(`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${blogId}`)
  }


  FetchMyBlog(): Observable<IEMyBlog[]>{
    return this.http.get<IEMyBlog[]>(`https://desolate-sierra-34755.herokuapp.com/api/MyBlogs/${this.UserId.user._id}`)
  }






}
