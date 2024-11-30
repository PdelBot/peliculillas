import { Pipe, PipeTransform } from '@angular/core';
import { DetailsService } from '../services/details.service';

@Pipe({
  name: 'serieDate',
  
})
export class SerieDatePipe implements PipeTransform {

  date: string = ""

  constructor(private serieService: DetailsService) {}

  transform(id: number): string {
    if (!id) {
      return ''; 
    }
    
    
    this.serieService.getSeriesDetails(id, 'es').subscribe(response => {
      this.date = response.first_air_date;
    }) 
    return this.date;
  }
}
