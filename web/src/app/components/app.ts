import {Component} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'parking-app',
  styles: [`
    :host { 
        //font-family: font-family: Calibri,"Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    header, footer, main {
        margin: 0 1em;
    }
    footer {
        margin-top: 1em;
        border-top: 1px solid #ccc;
        padding-top: 0.5em;
    }
`],
  template: '<router-outlet></router-outlet>'
})
export class App {
  name: string = 'Друг';
  url: string = 'https://park-solutions.atlassian.net';
  constructor() {}
}

