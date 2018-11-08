import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExternalProvidersComponent } from './external-providers.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  declarations: [ExternalProvidersComponent]
})
export class ExternalProvidersModule { }
