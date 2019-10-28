import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse'
})

export class ReversePipe implements PipeTransform {
    transform(value: string) {
        const stringArray = value.split('');
        return stringArray.reverse().join('');
    }
}
