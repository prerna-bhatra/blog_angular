import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service'
import {IEdraft} from './draft'

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  Drafts:any
  constructor(private service:ConfigService) { }

  ngOnInit(): void {
    this.service.ReadDraft()
    .subscribe(res=>
      {
         console.log("drafts",res)
        this.Drafts=res.data
      },
      err=>
      {
        console.log("err",err)
        alert(err)
      })
    
  }

}
