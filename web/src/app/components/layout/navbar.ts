import {Component} from '@angular/core';
import {UrlService,LogService} from "../../shared";


@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.css'],
  templateUrl: './navbar.html'
})
export class NavBar {

  constructor(private log: LogService,
              public url: UrlService){}

  ngOnInit() { this.log.trace(this,'ngOnInit'); }
  ngOnDestroy() { this.log.debug(this,'ngOnDestroy'); }
}
