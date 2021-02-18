import { Component, OnInit ,Input,Output } from '@angular/core';
import {NavbarService} from '../navbar.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input('SearchedData')SearchedData:any
  constructor(public nav:NavbarService) { }

  ngOnInit(): void {
  }

}
