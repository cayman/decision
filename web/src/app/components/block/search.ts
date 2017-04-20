import {Input, Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'search-block',
    templateUrl: 'search.html'
})
export class SearchBlock {

    @Input() url:string;
    @Input() query:string;
    @Input() placeholder:string;

    constructor(private router: Router){}

    search(q:string){
        this.router.navigate([this.url,{q}]);
    }

}

