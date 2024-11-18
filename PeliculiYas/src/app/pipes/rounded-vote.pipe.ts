import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedVote'
})
export class RoundedVotePipe implements PipeTransform {

  transform(value: number): number {
    return parseFloat(value.toFixed(1));
  }

}
