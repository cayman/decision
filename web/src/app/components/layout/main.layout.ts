import {Component, OnInit, ViewChild, Renderer} from '@angular/core';
import {ElementRef} from '@angular/core';
import {LogService} from "../../shared";

@Component({
  selector: 'main-layout',
  styleUrls: ['./main.layout.css'],
  templateUrl: './main.layout.html'
})
export class MainLayout implements OnInit {
  public title: any;

  @ViewChild('offCanvas') offCanvas:ElementRef;

  constructor(public log:LogService) {
    this.title = { value: 'Парковки' };
  }

  toggleCanvas() {
      this.offCanvas.nativeElement.classList.toggle('active');
  }

  ngOnInit() {
    this.log.trace(this,'ngOnInit');

  }
  ngOnDestroy() {
    this.log.debug(this,'ngOnDestroy');
  }
}
