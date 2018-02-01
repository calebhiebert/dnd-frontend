import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {IndexComponent} from './index/index.component';
import {AuthGuard} from './auth.guard';
import {LogoutComponent} from './logout/logout.component';
import {CharacterViewComponent} from './character-view/character-view.component';
import {CampaignFormComponent} from './campaign-form/campaign-form.component';
import {CampaignViewComponent} from './campaign-view/campaign-view.component';
import {CampaignIndexComponent} from './campaign-index/campaign-index.component';

const routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'campaigns', component: CampaignIndexComponent},
  {path: 'character/:id', component: CharacterViewComponent},
  {path: 'campaign/create', component: CampaignFormComponent, canActivate: [AuthGuard]},
  {path: 'campaign/:id', component: CampaignViewComponent},
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
