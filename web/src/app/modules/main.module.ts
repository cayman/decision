import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder}   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from '../components/app.routes';
import { PopoverModule} from 'ng2-bootstrap/popover'
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { UrlService, LogService, RestService, DateService, DateFormatPipe}  from '../shared';

import { App } from '../components/app';
import { MainLayout, SimpleLayout, NavBar, SideBar, Footer } from '../components/layout';
import { HomePage, NotFound, UnderConstruction } from '../components/page';
import { AllowDirective, AuthGuard, AuthLogin,AuthPassword,AuthBar,AuthRestService,AuthSessionService } from '../components/auth';
import { ErrorBlock, PaginationBlock, SearchBlock, EmptyList} from '../components/block';

import { UserRestService, UserList, UserEdit, UserCard, ProfileEdit, ProfileCard} from '../components/user';
import { RoleRestService, RoleList, RoleEdit, RoleCard} from '../components/role';
import { GrantList }  from '../components/grant';

import { ParkingAreaRestService, ParkingAreaList, ParkingAreaEdit, ParkingAreaCard}  from '../components/parking';
import { ParkingRestService, ParkingList, ParkingEdit, ParkingCard }  from '../components/parking';

import { RateGroupRestService, RateGroupList, RateGroupEdit, RateGroupCard, RoundModePipe, MinutePipe }  from '../components/rate';
import { RateRestService, RateList, RateEdit, RateCard, RublePipe} from "../components/rate";
import { PermitTypeRestService, PermitTypeList, PermitTypeEdit, PermitTypeCard, DurationPipe} from "../components/permit";
import { CarTypeRestService, CarTypeList, CarTypeEdit, CarTypeCard} from "../components/car";
import { DayTypeRestService, DayWeekRestService, DayRestService, DayTypeList, DayTypeEdit, DayTypeCard} from "../components/day";


import { CalendarPage, CalendarPopup, MonthPipe, WeekDayPipe} from '../components/calendar';


export { App };

@NgModule({
  bootstrap: [ App ],
  declarations: [App,
      MainLayout, SimpleLayout,
      NavBar, SideBar, Footer,
      HomePage, NotFound, UnderConstruction,
      ErrorBlock, PaginationBlock, SearchBlock, EmptyList,

      AuthLogin, AuthPassword, AuthBar,
      ProfileEdit, ProfileCard,
      UserList, UserEdit, UserCard,
      RoleList, RoleEdit, RoleCard,
      GrantList,
      RateGroupList,RateGroupEdit,RateGroupCard,
      RateList, RateEdit,RateCard,
      PermitTypeList, PermitTypeEdit, PermitTypeCard,
      CarTypeList, CarTypeEdit, CarTypeCard,
      DayTypeList, DayTypeEdit, DayTypeCard,
      ParkingAreaList, ParkingAreaEdit,  ParkingAreaCard,
      ParkingList, ParkingEdit, ParkingCard,

      CalendarPage, CalendarPopup,

      DurationPipe, MinutePipe, RublePipe,  RoundModePipe,
      MonthPipe, WeekDayPipe, DateFormatPipe,

      AllowDirective

  ],
  imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      HttpModule,
      PopoverModule.forRoot(),
      DatepickerModule.forRoot()
  ],
  providers: [ RestService, FormBuilder,
      UserRestService, RoleRestService,
      RateGroupRestService,RateRestService,
      ParkingAreaRestService, ParkingRestService,
      PermitTypeRestService, CarTypeRestService,
      DayTypeRestService, DayWeekRestService, DayRestService,
      AuthRestService, AuthSessionService, AuthGuard,
      LogService,UrlService,DateService
  ]
})
export class MainModule {}
