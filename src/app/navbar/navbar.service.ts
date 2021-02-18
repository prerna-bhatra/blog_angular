import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//for making clear input use service
export class NavbarService {
  visible: boolean;
  ClearInput:any
  HideSearch:boolean

  constructor() { this.visible = true; this.HideSearch=true }

  hide() { this.visible = false; }

  show() { this.visible = true; }
}
