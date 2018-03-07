import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'transportIcon'
})
export class TransportIconPipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
            case 'bus':
                return 'directions_bus';
            case 'car':
                return 'directions_car';
            default:
                return value;
        }
    }
}