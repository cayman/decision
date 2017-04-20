import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Validators, FormControl, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {UrlService,FormValidators,LogService} from "../../shared";


import {Subscription, Subject, Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/combineLatest';


import {UserRestService} from './user.rest';
import {UserDTO} from './user.dto';
import {RoleRestService,RoleDTO} from '../role';
import {AuthSessionService} from "../auth/auth.session";

@Component({
    selector: 'user-edit',
    templateUrl: 'user.edit.html'
})
export class UserEdit implements OnInit, OnDestroy {

    private subscription: Subscription;

    id: number;
    current: boolean = true;

    form: FormGroup;
    submitted:boolean=false;

    error:any;

    constructor(private fb: FormBuilder, private session: AuthSessionService,
                private log: LogService,
                private userRest: UserRestService, private roleRest: RoleRestService,
                public url: UrlService, private route: ActivatedRoute){
        this.log.debug(this);

        const roles = this.roleRest.getSortedArray()
            .do(list=>this.log.debug(this,'roles',list));

        this.subscription = this.url.getParamId(route)
            .do((id: number)=>this.id = id)
            .switchMap(id => this.userRest.getItem(id))
            .flatMap((user:UserDTO)=> session.user
                .do((admin:UserDTO)=>user.current = admin && user.login === admin.login)
                .map(()=>user)
            )
            .do((user: UserDTO)=>this.current = user.current)
            .combineLatest(roles,this.createUserForm.bind(this))
            .do((form:FormGroup)=>this.log.info(this,'form',form))
            .subscribe((form:FormGroup)=>this.form = form,
                e=>this.log.error(this,'subscribe',this.error = e));

    }

    private createUserForm = ({ login,name,email,roles,current}:UserDTO, dictionary:RoleDTO[]) =>
        this.fb.group({
                login: new FormControl({value: login, disabled:!!login},
                    [Validators.required, FormValidators.login(), Validators.minLength(5), Validators.maxLength(24)]
                ),
                name: new FormControl(name, [Validators.required,Validators.minLength(3)]),
                email: new FormControl({value: email, disabled:login},
                    [Validators.required, FormValidators.email() ]
                ),
                password: new FormControl({value: null,disabled:current},
                    login ? [Validators.minLength(5),Validators.maxLength(24)] :
                    [Validators.required,Validators.minLength(5),Validators.maxLength(24)]),

                roles:this.fb.array(
                    dictionary.map(item=>this.createRoleCheckbox(item,roles,current)),
                    FormValidators.itemSelected(['selected'])
                )
    });


    private createRoleCheckbox = (item:RoleDTO, roles:string[], disabled:boolean) => this.fb.group({
        name,
        selected: new FormControl({value: !!roles.find(role=>role===item.id),disabled})
    });


    private static extractDTO({id,login,name,email,password,roles}:any):UserDTO {
        return <UserDTO>{
            id, login, name, email,
            password: password && password.length>0?password:null,
            roles:roles.filter(role=>role.selected).map(role=>role.id)
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
        this.userRest.saveItem(this.id, UserEdit.extractDTO(this.form.getRawValue()))
            .subscribe((user:UserDTO)=>{
                this.url.navigate([this.url.USERS, user.login]);
            }, e=>this.log.error(this,'save',this.error = e));
    }


    remove(){
        this.userRest.removeItem(this.id)
            .subscribe((status:string)=>{
                this.url.navigate([this.url.USERS]);
            }, e=>this.log.error(this,'remove',this.error = e));
    }


    ngOnInit() {
        this.log.trace(this,'ngOnInit');

    }
    ngOnDestroy() {
        this.log.debug(this,'ngOnDestroy');
        this.subscription.unsubscribe();
    }
}
