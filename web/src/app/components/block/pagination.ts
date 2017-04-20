import {Input, Component, OnInit, OnDestroy} from '@angular/core';
import {ListDTO} from "../../shared";


@Component({
    selector: 'pagination-block',
    templateUrl: 'pagination.html'
})
export class PaginationBlock implements OnInit, OnDestroy {

    @Input() url:string;
    @Input() query:string;
    @Input() paginated:ListDTO<any>;

    params(q:string,n:number){
        return (q && q.trim().length>0) ? (n && n>0 ? {q,n} : {q}) : (n ? {n} : {});

    }

    ngOnInit() {}
    ngOnDestroy() { }
}

