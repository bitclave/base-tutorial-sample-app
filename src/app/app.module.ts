import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RoutingModule } from './routing/routing.module';
import { PublicPagesModule } from './publicPages/public-pages.module';
import { CabinetModule } from './privatePages/cabinet/cabinet.module';
import { DashboardModule } from './privatePages/dashboard/dashboard.module';

import { SettingsModule } from './privatePages/settings/settings.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PublicPagesModule,
    RoutingModule,
    CabinetModule,
    MatProgressSpinnerModule,
    DashboardModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
