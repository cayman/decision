import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';


@Injectable()
export class LogService{


    // var l = function () { //@todo
    //     console.log.apply(console, arguments);
    // }

    constructor(){ }

    public trace = LogService.trace.bind(console);
    public log = LogService.log.bind(console);
    public debug = LogService.debug.bind(console);
    public info = LogService.info.bind(console);
    public warn = LogService.warn.bind(console);
    public error = LogService.error.bind(console);

    public static trace(obj:any,...args: any[]){
        return console.log(LogService.className(obj),...LogService.parseParams(args));
    }

    public static log(obj:any,...args: any[]){
        return console.log(LogService.className(obj),...LogService.parseParams(args));
    }

    public static debug(obj:any,...args: any[]){
        return console.debug(LogService.className(obj),...LogService.parseParams(args));
    }

    public static info(obj:any,...args: any[]){
        return console.info(LogService.className(obj),...LogService.parseParams(args));
    }

    public static warn(obj:any,...args: any[]){
        return console.warn(LogService.className(obj),...LogService.parseParams(args));
    }

    public static error(obj:any,...args: any[]){
        return console.error(LogService.className(obj),...LogService.parseParams(args));
    }

    private static className(obj:any){
        return obj ? '['+ (obj.constructor ? obj.constructor.name : obj) +']' : '[]';
    }

    private static parseParams = (args:any[])=>[
        LogService.methodName(args[0],!args[1]),
        LogService.getValue(args[1],!args[2]),
        LogService.getValue(args[2],!args[3]),
        LogService.getValue(args[3],!args[4]),
        LogService.getValue(args[4],!args[5]),
        LogService.getValue(args[5])
    ].filter(value=>value);

    private static methodName(obj:any,last=true){
        return obj ? obj + ( last ? '':':') : '';
    }

    private static getValue(value:any,last=true){
        return last ? (value || undefined) : (value ? value.toString() + ',': '');
    }

}