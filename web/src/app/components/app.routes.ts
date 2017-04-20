import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";

import {HomePage, NotFound, UnderConstruction} from './page';
import {MainLayout, SimpleLayout} from './layout';

import {AuthLogin, AuthPassword, AuthGuard} from './auth';
import {UserList, UserEdit,UserCard, ProfileEdit, ProfileCard} from './user';



const routes: Routes = [
    {
        path: 'login', component: SimpleLayout,
        children: [
            {path: '', component: AuthLogin},
        ]
    },
    {
        path: '', component: MainLayout, canActivate: [AuthGuard],
        children: [
            {path: '', component: HomePage,},
        ]
    },
    {
        path: 'password', component: SimpleLayout, canActivate: [AuthGuard],
        children: [
            {path: '', component: AuthPassword},
        ]
    },
    {
        path: 'profile', component: MainLayout, canActivate: [AuthGuard],
        children: [
            {path: 'edit', component: ProfileEdit},
            {path: '', component: ProfileCard, pathMatch: 'full'},
        ]
    },
    // {
    //     path: 'companies', component: MainLayout, canActivate: [AuthGuard],
    //     children: [
    //         {path: ':id/edit', component: RateGroupEdit},
    //         {path: ':id', component: RateGroupCard},
    //         {path: ':group/rate', component: RateEdit},
    //         {path: '', component: RateGroupList, pathMatch: 'full'},
    //     ]
    // },
    {
        path: 'users', component: MainLayout, canActivate: [AuthGuard],
        children: [
            {path: ':login/edit', component: UserEdit},
            {path: ':login', component: UserCard},
            {path: '', component: UserList, pathMatch: 'full'},
        ]
    },
    {path: '**', component: NotFound},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
