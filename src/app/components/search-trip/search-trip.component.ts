import { Component, OnInit } from '@angular/core';
import { TripService, TripDealsResponseModel } from '../../services/trip.service';
import { TripSortType } from '../../enums/trip-sort-type.enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DealModel } from '../../models/deal.model';
import { VIEW_MODE_SEARCH, VIEW_MODE_RESULT } from './search-trip.constant';

@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss']
})
export class SearchTripComponent implements OnInit {

  VIEW_MODE_SEARCH = VIEW_MODE_SEARCH;
  VIEW_MODE_RESULT = VIEW_MODE_RESULT;
  TripSortType = TripSortType;
  cities: Array<string>;
  tripSorterForm: FormGroup;
  sortType: TripSortType;
  deals: Array<DealModel>;
  searchResult: Array<DealModel>;
  mode: string;
  totalTime: string;
  totalCost: number;
  
  constructor(private _tripService: TripService, private _formBuilder: FormBuilder) {
    this.mode = VIEW_MODE_SEARCH;
    this.tripSorterForm = this._formBuilder.group({
      departure: ['', [Validators.required]],
      arrival: ['', [Validators.required]],
      sortType: [TripSortType.CHEAPEST, [Validators.required]]
    });
   }

  ngOnInit() {
    this._tripService.getTripDeals().subscribe((response: TripDealsResponseModel) => {
      this.deals = response.deals;
      this.cities = this._tripService.getCitiesFromDeals(this.deals, true);
    });
  }

  /**
   * Update sort type when user click on toggle button
   */
  onChangeSortType(event) {
    this.sortType = event.value;
  }

  /**
   * On click on search button
   */
  onSearch() {
    if (this.tripSorterForm.valid) {
      const { departure, arrival, sortType } = this.tripSorterForm.value;
      this.searchResult = this._tripService.dijkstra(this.deals, departure, arrival, sortType);
      const summary = this._tripService.getTripSummary(this.searchResult);
      this.totalTime = summary.totalTime;
      this.totalCost = summary.totalCost;
      if (this.searchResult.length > 0) {
        this.mode = VIEW_MODE_RESULT;
      }
    }
  }

  /**
   * Go back to Search Form
   */
  onReset() {
    this.mode = VIEW_MODE_SEARCH;
  }

  /**
   * Swap departure and arrival city in search form
   */
  onSwapCity() {
    let { departure, arrival } = this.tripSorterForm.value;

    const temp = departure;
    departure = arrival;
    arrival = temp;

    this.tripSorterForm.controls.departure.patchValue(departure);
    this.tripSorterForm.controls.departure.updateValueAndValidity();

    this.tripSorterForm.controls.arrival.patchValue(arrival);
    this.tripSorterForm.controls.arrival.updateValueAndValidity();
  }

  /**
   * Update Search Result when user change sort type in result page
   */
  onUpdateResultForSortType() {
    let newSortType;
    if (this.tripSorterForm.value.sortType === TripSortType.CHEAPEST) {
      newSortType = TripSortType.FASTEST;
    } else {
      newSortType = TripSortType.CHEAPEST;
    }
    this.tripSorterForm.controls.sortType.patchValue(newSortType);
    this.tripSorterForm.controls.sortType.updateValueAndValidity();

    const { departure, arrival, sortType } = this.tripSorterForm.value;
    
    this.searchResult = this._tripService.dijkstra(this.deals, departure, arrival, sortType);
    const summary = this._tripService.getTripSummary(this.searchResult);
    this.totalTime = summary.totalTime;
    this.totalCost = summary.totalCost;
  }
}
