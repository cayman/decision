import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'under-construction',
  templateUrl: './under-construction.html'
})
export class UnderConstruction implements OnInit, OnDestroy {
  public name: string;
  constructor() {
    this.name = '';
  }

  ngOnInit() {  }
  ngOnDestroy() { }
}
