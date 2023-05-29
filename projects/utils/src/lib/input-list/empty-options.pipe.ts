import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
  name: 'optionsEmpty',
  pure: true
})
export class OptionsEmpty implements PipeTransform {

  transform(options: any[]): boolean {
    return options.length < 2 || options.some(option => option.text.length === 0);
  }


}
