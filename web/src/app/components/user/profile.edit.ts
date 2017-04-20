import {Component, OnInit, OnDestroy} from '@angular/core'
import {Validators, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {UrlService,FormValidators,LogService} from "../../shared";


import {Observable} from "rxjs/Observable";
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/combineLatest';

import {UserRestService} from './user.rest';
import {UserDTO} from './user.dto';
import {RoleRestService,RoleDTO} from '../role';
import {AuthSessionService} from "../auth/auth.session";

@Component({
    selector: 'profile-edit',
    templateUrl: 'profile.edit.html'
})
export class ProfileEdit implements OnInit, OnDestroy {


    private subscription: Subscription;

    id: number;
    current: boolean = true;
    roles: string[];

    form: FormGroup;
    submitted:boolean=false;

    error:any;

    constructor(private fb: FormBuilder, private session: AuthSessionService,
                private log: LogService,
                private userRest: UserRestService, private roleRest: RoleRestService,
                public url: UrlService){
        this.log.debug(this);
        this.subscription = session.user
            .filter(user=>!!user)
            .map((user:UserDTO)=>this.id = user.id)
            .switchMap((id:number) => this.userRest.getItem(id))
            .do((user: UserDTO)=>this.roles = user.roles)
            .map(this.createProfileForm.bind(this))
            .do((form:FormGroup)=>this.log.info(this,'form',form))
            .subscribe((form:FormGroup)=>this.form = form,
                e=>this.log.error(this,'subscribe',this.error = e));

    }

    private createProfileForm = ({ login,name,email}:UserDTO) =>
        this.fb.group({
            login: new FormControl({value: login, disabled:true},
                [Validators.required, FormValidators.login(), Validators.minLength(5), Validators.maxLength(24)]
            ),
            name: new FormControl(name, [Validators.required,Validators.minLength(3)]),
            email: new FormControl({value: email, disabled:true},
                [Validators.required, FormValidators.email() ]
            )
    });


    private static extractDTO({login,name,email}:any, roles:RoleDTO[]):UserDTO {
        return <UserDTO>{
            login, name, email, roles
        }
    };

    hasError = (ctrlName) => FormValidators.displayedError(this.form.get(ctrlName),this.submitted);

    save(){
        this.submitted = true;
        if(!this.form.valid){
            this.error = { message:'Неверно заполнены данные формы',status:101};
            return;
        }
        this.log.info(this,'save',this.form.getRawValue());
        this.userRest.saveItem(this.login, ProfileEdit.extractDTO(this.form.getRawValue(),this.roles))
            .subscribe((user:UserDTO)=>{
                this.url.navigate([this.url.PROFILE]);
            }, e=>this.log.error(this,'save',this.error = e));
    }

    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }
}
