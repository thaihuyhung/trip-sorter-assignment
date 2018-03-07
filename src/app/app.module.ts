import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';
import { TripService } from './services/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchTripResultComponent } from './components/search-trip-result/search-trip-result.component';
import { TransportIconPipe } from './pipes/transport-icon.pipe';
import { DealPricePipe } from './pipes/deal-price.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchTripComponent,
    SearchTripResultComponent,
    TransportIconPipe,
    DealPricePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  providers: [
      TripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
