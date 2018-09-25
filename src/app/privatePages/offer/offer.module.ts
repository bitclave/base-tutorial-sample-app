import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './offer.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { OfferItemComponent } from './offer-item/offer-item.component';

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
    MatDividerModule
  ],
  declarations: [OfferComponent, OfferItemComponent]
})
export class OfferModule { }
