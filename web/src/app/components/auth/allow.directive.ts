import {Directive, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import {AuthSessionService} from "./auth.session";
import {Subscription} from "rxjs/Subscription";
@Directive({
    selector: '[allow]'
})
export class AllowDirective implements OnInit, OnDestroy {

    private grant:any;

    private subscription: Subscription;

    @Input() set allow(grant: any) {
        this.grant = grant;
        this.setVisible(this.session.allow(grant));
    }

    constructor(private el: ElementRef, private session: AuthSessionService) {
        this.subscription = this.session.user
            .subscribe(()=>{
            this.grant ? this.setVisible(session.allow(this.grant)) : null;
        });
    }



    private setVisible(visible: boolean) {
        this.el.nativeElement.style.display = visible ? 'block' : 'none';
    }

    ngOnInit() {
           }
    ngOnDestroy() {
         this.subscription.unsubscribe();
    }

}
