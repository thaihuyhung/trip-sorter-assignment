import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DealModel } from '../../models/deal.model';

@Component({
  selector: 'app-search-trip-result',
  templateUrl: './search-trip-result.component.html',
  styleUrls: ['./search-trip-result.component.scss']
})
export class SearchTripResultComponent implements OnInit {

  @Input()
  routes: Array<DealModel> = [];

  @Input()
  sortType: string;

  @Input()
  totalTime: string;

  @Input()
  totalCost: string;

  @Output()
  reset: EventEmitter<boolean>;

  @Output()
  changeSortType: EventEmitter<boolean>;

  constructor() {
    this.reset = new EventEmitter();
    this.changeSortType = new EventEmitter();
   }

  ngOnInit() {
  }

  /**
   * Emit reset event output
   */
  onReset() {
    this.reset.emit(true);
  }

  /**
   * Emit change sort type event output
   */
  onChangeSortType() {
    this.changeSortType.emit(true);
  }

}
