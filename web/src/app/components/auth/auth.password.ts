import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {UrlService,FormValidators,LogService} from "../../shared";

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';


import {AuthSessionService} from './auth.session';
import {UserRestService, UserDTO} from '../user';

@Component({
    selector: 'auth-password',
    templateUrl: 'auth.password.html'
})
export class AuthPassword implements OnInit, OnDestroy {

    private subscription: Subscription;

    id: number;
    form: FormGroup;
    submitted:boolean=false;

    error:any;

    constructor(private fb: FormBuilder, private log: LogService, private session: AuthSessionService,
                private userRest: UserRestService,
                public url: UrlService){
        this.log.debug(this);
        this.subscription = this.session.user
            .map((credentials:UserDTO) => this.createPasswordForm(credentials || <UserDTO>{}))
            .do((form:FormGroup)=>this.log.info(this,'form',form))
            .subscribe((form:FormGroup)=>this.form = form,
                e=>this.log.error(this,'subscribe',this.error = e));

    }

    private createPasswordForm = ({ login }:UserDTO) => {
        const password = new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(24)]);

        return this.fb.group({
            login,
            currentPassword: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(24)]),
            password:new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(24)]),
            confirmPassword: new FormControl(null, [Validators.required])//@todo not work
        },{validator:FormValidators.equals('password','confirmPassword')});
    };

    private static extractDTO({login,currentPassword,password}:any):UserDTO {
        return <UserDTO>{
            login,
            currentPassword,
            password
        }
    };

    hasError = (ctrlName) => FormValidators.displayedError(this.form.get(ctrlName),this.submitted);

    equalsError = (password:FormControl,confirm:FormControl) =>
        this.form.invalid && this.form.hasError('equals') && (this.submitted || (password.dirty && confirm.dirty));

    submit(){
        this.submitted = true;
        if(!this.form.valid){
            this.error = { message:'Неверно заполнены данные формы',status:101};
            return;
        }
        this.log.info(this,'submit',this.form.getRawValue());
        this.userRest.passwordChange(AuthPassword.extractDTO(this.form.getRawValue())).subscribe(
            (user:UserDTO)=> {
                this.url.navigate([this.url.HOME]);
            },
            e=>this.log.error(this,'submit',this.error = e)
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
