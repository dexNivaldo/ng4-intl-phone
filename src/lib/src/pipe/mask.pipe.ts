import {Pipe, PipeTransform} from '@angular/core';
import {Country} from '../..';


@Pipe({
    name: 'mask'
})
export class MaskPipe implements PipeTransform {

    transform(value: string, country?: Country): any {
        if (country) {
            value = value.replace(/ /g, '');
            const phone = value.substring(country.dialCode.length + 1)
            return `+${country.dialCode} ${this.format(phone)}`;
        }
        return value
    }

    private format(v: string): string {
        let s = '';
        const mask = '(999) 999 9999';
        const matches = v.match(/[a-zA-Z0-9]+/g);
        if (matches !== null) {
            let value = matches.join('').split('');

            const chars = mask.split('');
            for (let c of chars) {
                // if (value.length === 0) {
                //   break;
                // }

                switch (c) {

                    case '9':
                        if (value.length > 0) {
                            if (value[0].match(/\d/) !== null) {
                                s += value[0];
                                value = value.slice(1);
                            }
                        }
                        break;

                    default:
                        s += c;
                }
            }
        }

        return s;
    }

}
