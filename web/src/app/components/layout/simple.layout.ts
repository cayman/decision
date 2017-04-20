import {Component, OnInit} from '@angular/core';
import {LogService} from "../../shared";

@Component({
  selector: 'simple-layout',
  styleUrls: ['./simple.layout.css'],
  templateUrl: './simple.layout.html'
})
export class SimpleLayout implements OnInit {
  public title: any;
  constructor(public log:LogService) {
    this.title = { value: 'Парковки' };
  }

  ngOnInit() { this.log.trace(this,'ngOnInit'); }
  ngOnDestroy() { this.log.debug(this,'ngOnDestroy'); }
}
