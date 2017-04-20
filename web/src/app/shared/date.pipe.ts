import { Pipe, PipeTransform } from '@angular/core';
import {DateService} from "./date.service";

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {

    constructor(private dateService:DateService){}

    transform(date: Date | string): string {
        return this.dateService.formatLocal(date) || '';
    }
}