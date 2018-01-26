import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {IndexComponent} from "./index/index.component";
import {AuthGuard} from "./auth.guard";
import {LogoutComponent} from "./logout/logout.component";
import {CharacterViewComponent} from "./character-view/character-view.component";

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'character/:id', component: CharacterViewComponent, canActivate: [AuthGuard] },
  { path: '**', component: IndexComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
