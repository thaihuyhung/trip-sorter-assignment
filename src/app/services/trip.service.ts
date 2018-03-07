import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DealModel } from '../models/deal.model';
import { TripSortType } from '../enums/trip-sort-type.enum';

@Injectable()
export class TripService {

  constructor(private _http: HttpClient) { }

  /**
   * Get list of deals from api
   * @returns         List of deals.
   */
  public getTripDeals = (): Observable<any> => {
    return this._http.get('assets/mock-data/response.json');
  }

  /**
   * Get lowest cost from a particular city to another city,.
   * @param deals     List of available deals.
   * @param isSorted  Whether sort list of city by alphabet.
   * @returns         List of cities.
   */
  public getCitiesFromDeals = (deals: Array<DealModel>, isSorted?: boolean): Array<string> => {
    const citySet = new Set();
    deals.forEach(deal => {
      citySet.add(deal.arrival);
      citySet.add(deal.departure);
    });
    const cityArray = Array.from(citySet);
    if (isSorted) {
      return cityArray.sort();
    }
    return cityArray;
  }
  
  /**
   * Get lowest cost from a particular city to another city,.
   * @param deals     List of available deals.
   * @param departure Departure city.
   * @param arrival   Arrival city.
   * @param sortType  Cheapest or Fastest.
   * @returns         List of deal suitable for the search query.
   */
  public dijkstra = (deals: Array<DealModel>, departure: string, arrival: string, sortType: TripSortType): Array<DealModel> => {
    const cities = this.getCitiesFromDeals(deals);
    const cost = {};
    const direction = {};

    cities.forEach(city => cost[city] = -1);
    cost[departure] = 0;

    while (cities.length > 0) {
      const lowestCostCity = this.getLowestCostCity(cities, cost);
      if (lowestCostCity === arrival) {
        break;
      }
      const removeIndex = cities.findIndex(x => x === lowestCostCity);
      cities.splice(removeIndex, 1);

      deals.filter(x => x.departure === lowestCostCity).forEach(deal => {
        const newCost = cost[lowestCostCity] + this.getCost(deal, sortType);
        if (cost[deal.arrival] === -1 || newCost < cost[deal.arrival]) {
          cost[deal.arrival] = newCost;
          direction[deal.arrival] = deal;
        }
      });
    }
    const routes = [];

    let origin = arrival;
    while (origin !== departure){
      routes.unshift(direction[origin]);
      origin = direction[origin].departure;
    }
    return routes;
  }

  /**
   * Get lowest cost from a particular city to another city,.
   * @param cities    List of available cities.
   * @param cost      Temporary cost to arrive to particular city.
   * @returns         city name.
   */
  private getLowestCostCity = (cities: Array<string>, cost: Object): string => {
    return cities.filter(city => cost[city] >= 0).reduce((pre, cur) => {
      if (pre === null || cost[cur] < cost[pre]) {
          pre = cur;
      }
      return pre;
    }, null);
  }

  /**
   * Get cost from a particular city to another city, cost could be time or money.
   * @param deal      An object with departure/arrival and cost information.
   * @param sortType  Cheapest or Fastest.
   * @returns         Cost value.
   */
  private getCost = (deal :DealModel, sortType: TripSortType): number => {
    const { cost, discount, duration } = deal;
    const { h, m } = duration;
    switch(sortType) {
      case TripSortType.CHEAPEST:
        return cost * (1 - discount/100);
      case TripSortType.FASTEST:
        return parseInt(h) * 60 + parseInt(m);
      default:
        return 0;  
    }
  }

  /**
   * Get trip's summary information such as total travel time and total cost.
   * @param routes  list of route/deal.
   * @returns       An object with totalTime and totalCost.
   */
  public getTripSummary = (routes: Array<DealModel>): {
    totalTime: string,
    totalCost: number
  } => {
    const summary = routes.reduce((pre, cur) => {
      pre.minutes += parseInt(cur.duration.h) * 60 + parseInt(cur.duration.m);
      pre.actualCost += cur.cost * (1 - cur.discount / 100);
      return pre;
    }, {
      minutes: 0,
      actualCost: 0
    });
    const { minutes, actualCost } = summary;

    const hours = Math.ceil(minutes / 60);
    const minutesOnly = minutes % 60;
    const minutesText = minutesOnly < 10 ? '0' + minutesOnly : minutesOnly;
    const totalTime = `${hours}h ${minutesText}m`;
    return {
      totalTime,
      totalCost: actualCost
    }
  }
}

export class TripDealsResponseModel {
  currency: string;
  deals: Array<DealModel>
}
