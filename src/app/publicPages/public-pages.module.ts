import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    NotFoundComponent,
    LandingComponent ]
})
export class PublicPagesModule { }
