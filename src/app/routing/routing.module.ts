import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes} from '@angular/router';
import { BaseAuthGuard } from './../services/base-auth.guard';
import { CabinetComponent } from './../privatePages/cabinet/cabinet.component';
import { DashboardComponent } from './../privatePages/dashboard/dashboard.component';
import { LandingComponent } from './../publicPages/landing/landing.component';
import { SettingsComponent } from './../privatePages/settings/settings.component';
import { SearchRequestComponent } from './../privatePages/search-request/search-request.component';
import { OfferComponent } from './../privatePages/offer/offer.component';
import { ExternalProvidersComponent } from './../privatePages/external-providers/external-providers.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'search-request',
        component: SearchRequestComponent
      },
      {
        path: 'offer',
        component: OfferComponent
      },
      {
        path: 'providers',
        component: ExternalProvidersComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }

    ],
    canActivate: [BaseAuthGuard]
  },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
