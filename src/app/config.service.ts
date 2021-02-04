import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {IEtrendingBlogs,IEnewBlogs,IErestBlogs} from './home/home'
import {IElogin} from './login-form/login'
import { BehaviorSubject } from 'rxjs';
//import { fingerprint } from '@angular/compiler/src/i18n/digest';

declare var ClientJS: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  fingerprint:any= new ClientJS().getFingerprint()

 
  
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


}
