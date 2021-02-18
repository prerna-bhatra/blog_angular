import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service'
import { NavbarService } from '../navbar/navbar.service'
import {IEdraft} from './draft'

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  Drafts:any
  NoDrafts:boolean=false
  constructor(private service:ConfigService,public nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.hide()
    this.service.ReadDraft()
    .subscribe(res=>
      {
         console.log("drafts",res)
        this.Drafts=res.data
        if(this.Drafts.length==0)
        {
          this.NoDrafts=true
        }
      },
      err=>
      {
        console.log("err",err)
        // alert(err)
      })
    

  }

}
