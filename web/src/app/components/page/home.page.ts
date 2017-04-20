import {Component, OnInit, OnDestroy} from '@angular/core';
import {UrlService,LogService} from "../../shared";

@Component({
  selector: 'home-page',
  styleUrls: ['./home.page.css'],
  templateUrl: './home.page.html'
})

export class HomePage implements OnInit,OnDestroy {

  public query: string;

  constructor(private log: LogService,
              public url: UrlService){}

  ngOnInit() { this.log.trace(this,'ngOnInit'); }
  ngOnDestroy() { this.log.debug(this,'ngOnDestroy'); }
}
