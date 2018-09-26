import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRequestComponent } from './search-request.component';
import { SearchRequestItemComponent } from './search-request-item/search-request-item.component';



import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OfferModule } from './../offer/offer.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    OfferModule
  ],
  declarations: [
    SearchRequestComponent,
    SearchRequestItemComponent
  ]
})
export class SearchRequestModule { }
