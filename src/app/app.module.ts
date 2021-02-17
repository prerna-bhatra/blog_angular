import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SignupFormComponent } from 'src/signup-form/signup-form.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfigComponent } from './config/config.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { ReadblogComponent } from './readblog/readblog.component';
import { MyblogComponent } from './myblog/myblog.component';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { DraftComponent } from './draft/draft.component';
import { CommentComponent } from './readblog/comment/comment.component';
import { AllCommentsComponent } from './readblog/all-comments/all-comments.component';
import { MyCommentsComponent } from './readblog/my-comments/my-comments.component';
import { SearchComponent } from './navbar/search/search.component';
import { ReaddraftComponent } from './readdraft/readdraft.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    ConfigComponent,
    WriteBlogComponent,
    ReadblogComponent,
    MyblogComponent,
    DraftComponent,
    CommentComponent,
    AllCommentsComponent,
    MyCommentsComponent,
    SearchComponent,
    ReaddraftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    // Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
