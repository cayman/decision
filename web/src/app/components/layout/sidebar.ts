import {Component, OnInit, OnDestroy} from '@angular/core';
import {UrlService,LogService} from "../../shared";

@Component({
  selector: 'sidebar',
  styleUrls: ['./sidebar.css'],
  templateUrl: './sidebar.html'
})
export class SideBar implements OnInit, OnDestroy{

  constructor(private log: LogService,
              public url: UrlService){}

  ngOnInit() { this.log.trace(this,'ngOnInit'); }
  ngOnDestroy() { this.log.debug(this,'ngOnDestroy'); }
}
