import {Input, Component, OnInit, OnDestroy} from '@angular/core';
import {ListDTO} from "../../shared";


@Component({
    selector: 'empty-list',
    templateUrl: 'empty.html'
})
export class EmptyList implements OnInit, OnDestroy {

    @Input() items:any[];

    ngOnInit() {

    }
    ngOnDestroy() { }
}

