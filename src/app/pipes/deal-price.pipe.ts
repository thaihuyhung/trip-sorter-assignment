import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'dealPrice'
})
export class DealPricePipe implements PipeTransform {

  transform(value: number, discount: number): string {
    const actualPrice = value * (1 - discount / 100);
    const currencyPipe = new CurrencyPipe('en_US');
    return currencyPipe.transform(actualPrice, 'EUR', 'symbol', '.0-2');
  }

}
