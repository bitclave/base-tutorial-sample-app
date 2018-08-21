import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LandingComponent } from './../publicPages/landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    LandingComponent ]
})
export class PublicPagesModule { }
