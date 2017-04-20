import {Component, OnInit, OnDestroy} from '@angular/core'
import {Validators, FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {UrlService,FormValidators,LogService} from "../../shared";

import {AuthSessionService} from './auth.session';
import {UserDTO} from '../user';

import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'auth-login',
	styleUrls: ['./auth.login.css'],
    templateUrl: 'auth.login.html'
})
export class AuthLogin implements OnInit, OnDestroy {

    private subscription: Subscription;

    id: number;
    form: FormGroup;
    submitted:boolean=false;

    error:any;

    constructor(private fb: FormBuilder, private log: LogService, private session: AuthSessionService,
                public url: UrlService){
        this.log.debug(this);
        this.subscription = Observable.of(<UserDTO>{login:'sysadm',password:'sysadm'})
            .map((credentials:UserDTO) => this.createLoginForm(credentials))
            .do((form:FormGroup)=>this.log.info(this,'form',form))
            .subscribe((form:FormGroup)=>this.form = form, e=>this.log.error(this,'subscribe',this.error = e));

    }


    private createLoginForm = ({ login, password }:UserDTO) => this.fb.group({
        login: new FormControl(login,
            [Validators.required, FormValidators.login(), Validators.minLength(5), Validators.maxLength(24)]
        ),
        password: new FormControl(password, login ? [Validators.required,Validators.minLength(5),Validators.maxLength(24)] : null)
    });

    hasError = (ctrlName) => FormValidators.displayedError(this.form.get(ctrlName),this.submitted);

    submit(){
        this.submitted = true;
        if(!this.form.valid){
            this.error = { message:'Неверно заполнены данные формы',status:101};
            return;
        }

        this.session.login(this.form.getRawValue()).subscribe(
            (user:UserDTO)=> {
                const redirect = user.needChangePassword ? this.url.PASSWORD : this.session.getRedirectUrl();
                this.log.debug(this,'redirect',redirect);
                this.url.navigate([ redirect ]);
            },
            e=>this.log.error(this,'login',this.error = e)
        );
    }


    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }
}
