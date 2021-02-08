import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {SignupFormComponent} from 'src/signup-form/signup-form.component'
import {LoginFormComponent} from './login-form/login-form.component'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import {HomeComponent} from './home/home.component'
import {NavbarComponent} from './navbar/navbar.component'
import {WriteBlogComponent} from './write-blog/write-blog.component'
import {ReadblogComponent} from './readblog/readblog.component'
import {MyblogComponent} from './myblog/myblog.component'
const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'write', component: WriteBlogComponent },
  {path:'read/:blogId',component:ReadblogComponent},
  {path:'nav',component:NavbarComponent},
  {path:'stories',component:MyblogComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
