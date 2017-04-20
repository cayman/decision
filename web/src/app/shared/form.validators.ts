
import {FormControl, FormArray, AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isPresent} from "@angular/forms/src/facade/lang";



export class FormValidators {


    static displayedError(ctrl:AbstractControl, submitted=false){
        return ctrl.invalid && (submitted || ctrl.touched || ctrl.dirty);
    }


    static ISO_DATE_PATTERN =/^2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;
    static TIME_PATTERN = /^([0-1]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;


    static PHONE_PATTERN = /(\+?\d[- .]*){7,13}/;
    static LOGIN_PATTERN = /[a-zA-Z_]+/;
    static EMAIL_PATTERN= /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;

    static itemSelected(names:Array<string>) {
        return (list: FormArray): {[key: string]: boolean} =>
            names.length===0
                ? (list.length> 0 ? null : {selected: true} )
                : list.controls.find((item: FormControl) => !!names.find(name=>item.get(name).value) ) ? null : {selected: true};

    }

    static login():ValidatorFn{
        return Validators.pattern(FormValidators.LOGIN_PATTERN);
    }

    static email():ValidatorFn{
        return Validators.pattern(FormValidators.EMAIL_PATTERN);
    }
    static phone(): ValidatorFn {
        return Validators.pattern(FormValidators.PHONE_PATTERN)
    }

    static date(prms:any = {}): ValidatorFn {

        return (control: FormControl): {[key: string]: any} => {
            if(isPresent(Validators.required(control))) {
                return null;
            }

            const actual:string = control.value;

            if (!FormValidators.ISO_DATE_PATTERN.test(actual))
                return { "date": {actual} };

            let value: Date = new Date(actual);
            value.setHours(0, 0, 0, 0);

            let min =  prms.min ? (prms.min instanceof Date ? prms.min :
                    FormValidators.ISO_DATE_PATTERN.test(prms.min) ? new Date(prms.min) : null ) : null;

            let max = prms.max ? (prms.max instanceof Date ? prms.max :
                    FormValidators.ISO_DATE_PATTERN.test(prms.max) ? new Date(prms.max) : null) : null;

            if(min && max) {
                min.setHours(0, 0, 0, 0);max.setHours(0, 0, 0, 0);
                return  value < min && value > max ? { "minDate": {min, value, actual}, "maxDate": {max, value, actual} } :
                        value < min  ? { "minDate": {min, value, actual} } :
                        value > max ? { "maxDate": {max, value, actual} }:null;
            } else if(min) {
                min.setHours(0, 0, 0, 0);
                return value < min ? {"minDate": {min, value, actual}} : null;
            } else if(max) {
                max.setHours(0, 0, 0, 0);
                return value > max ? {"maxDate": {max, value, actual}} : null;
            } else {

                return null;
            }
        };
    }

    static dateGreaterThan(firstKey:string,secondKey:string): ValidatorFn {

        return (group: FormControl): {[key: string]: any} => {

            const first:AbstractControl = group.get(firstKey);

            const second:AbstractControl = group.get(secondKey);

            if (!FormValidators.ISO_DATE_PATTERN.test(first.value))
                return null;

            if (!FormValidators.ISO_DATE_PATTERN.test(second.value))
                return null;

            let firstValue: Date = new Date(first.value);
            firstValue.setHours(0, 0, 0, 0);

            let secondValue: Date = new Date(second.value);
            secondValue.setHours(0, 0, 0, 0);

            return secondValue > firstValue ? null : {"dateGreaterThan": {first:first.value, second:second.value}};

        };
    }

    static equals(firstKey:string,secondKey:string): ValidatorFn {

        return (group: FormControl): {[key: string]: any} => {

            const first:AbstractControl = group.get(firstKey);
            const second:AbstractControl = group.get(secondKey);

            if(isPresent(Validators.required(first) && isPresent(Validators.required(second)))) {
                return null;
            }

            if(first && second && first.value!==second.value)
                return {"equals": {first:first.value, second:second.value}};
            return null;

        };
    }


    static time(): ValidatorFn {
        return (control: FormControl): {[key: string]: any} => {
            if(isPresent(Validators.required(control))) {
                return null;
            }

            const actual:string = control.value;

            if (!FormValidators.TIME_PATTERN.test(actual))
                return { "time": {actual} };

            return null;
        };
    }

    static number(prms:any = {}): ValidatorFn {
        return (control: FormControl): {[key: string]: any} => {
            if(isPresent(Validators.required(control))) {
                return null;
            }

            let val: number = control.value;

            if(isNaN(val) || /\D/.test(val.toString())) {

                return {"number": {actual:val}};
            }
            const min = !isNaN(prms.min);
            const max = !isNaN(prms.max);

            if(min && max) {
                return val < prms.min || val > prms.max ? {"number": {min:prms.min ,max:prms.max, actual:val} } : null;
            } else if(min) {

                return val < prms.min ? {"number": {min:prms.min, actual:val}} : null;
            } else if(max) {

                return val > prms.max ? {"number": {max:prms.max, actual:val}} : null;
            } else {

                return null;
            }
        };
    }

}
