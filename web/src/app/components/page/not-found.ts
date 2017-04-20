import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: 'not-found.html'
})
export class NotFound implements OnInit, OnDestroy {
  public name: string;
  constructor() {
    this.name = '';
  }

  ngOnInit() {  }
  ngOnDestroy() {  }
}
