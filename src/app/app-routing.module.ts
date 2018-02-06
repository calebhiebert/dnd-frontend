import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {IndexComponent} from './index/index.component';
import {AuthGuard} from './services/auth.guard';
import {LogoutComponent} from './auth/logout/logout.component';
import {CharacterViewComponent} from './character/character-view/character-view.component';
import {CampaignFormComponent} from './campaign/campaign-form/campaign-form.component';
import {CampaignViewComponent} from './campaign/campaign-view/campaign-view.component';
import {CampaignIndexComponent} from './campaign/campaign-index/campaign-index.component';
import {HomeComponent} from './home/home.component';
import {SessionViewComponent} from './session/session-view/session-view.component';

const routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'campaigns', component: CampaignIndexComponent},
  {path: 'character/:id', component: CharacterViewComponent},
  {path: 'campaign/create', component: CampaignFormComponent, canActivate: [AuthGuard]},
  {path: 'campaign/:id', component: CampaignViewComponent},
  {path: 'campaign/:id/session', component: SessionViewComponent},
  {path: 'campaign/edit/:id', component: CampaignFormComponent, canActivate: [AuthGuard]},
  {path: '', component: IndexComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
