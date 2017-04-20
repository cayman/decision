import {Injectable} from '@angular/core';
import {IntervalParams} from "./interval.params";

@Injectable()
export class DateService {

    public DATE_FORMAT = 'dd.MM.yyyy';


    private ENG = false;
    // private ENG = true;

    public months: any[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    public weekDays: any[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    constructor() {
    }

    public getTomorrow = ():Date => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    };

    public createStartDate (start:string):Date {
        return start ? new Date(start) : this.getTomorrow();
    }

    public createEndDate (date:string):Date {
        return date ? new Date(date) : null;
    }


    public getMonthName=(month:number)=>this.months[month];
    public getWeekDayName=(weekDay:number)=>this.weekDays[weekDay];

    public formatISO = (date:Date | string) => {
        if(!date) return null;
        if(date instanceof Date) return this.createISO(date.getFullYear(), date.getMonth(), date.getDate());
        return date;
    };

    public formatLocal = (date:Date | string) => {
        if(!date) return null;
        const d = date instanceof Date ? date : new Date(date);
        return this.createLocal(d.getFullYear(), d.getMonth(), d.getDate());
    };

    public timeISO = (time:string,defTime:string=null) => time ? ( time.length==5? time : time.length>5 ? time.substr(0,5) : defTime ) : defTime;

    public createISO = (year:number,month:number,day:number) =>
        `${year}-${month>=9?(month+1):('0'+(month+1))}-${day>9?day:('0'+day)}`;

    public createLocal = (year:number,month:number,day:number) =>
        this.ENG ?
            `${day>9?day:('0'+day)}/${month>=9?(month+1):('0'+(month+1))}/${year}`:
            `${day>9?day:('0'+day)}.${month>=9?(month+1):('0'+(month+1))}.${year}`;

    public createInterval = (start:Date | string,end:Date | string):IntervalParams =>
        ({start: this.formatISO(start), end: this.formatISO(end)});


    //Перевод номера колонки в календаре (>=0) в день недели (0-6)
    public indexToWeekDay(index:number) {
        const day = index%7;
        return this.ENG ? day : day === 6 ? 0 : day + 1;
    }

    //Перевод дня недели (0-6) в номер колонки в календаре (>=0)
    public weekDayToIndex(weekDay:number) {
        return this.ENG ? weekDay: weekDay === 0 ? 6 : weekDay - 1;
    }

    //Количество дней в месяце
    public monthDays = (year:number,month:number):number => new Date(year, month + 1, 0).getDate();

}
