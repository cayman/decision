import {Input, Component, OnInit, OnDestroy} from '@angular/core';


@Component({
    selector: 'error-block',
    templateUrl: 'error.html'
})
export class ErrorBlock implements OnInit, OnDestroy {

    @Input() error:any;

    ngOnInit() {}
    ngOnDestroy() {}
}

