import { Pipe, PipeTransform } from '@angular/core';
import { DetailsService } from '../services/details.service';

@Pipe({
  name: 'serieName',
  pure: false
})
export class SerieNamePipe implements PipeTransform {

  name: string = ""

  constructor(private serieService: DetailsService) {}

  transform(id: number): string {
    if (!id) {
      return '';
    }
    
   
    this.serieService.getSeriesDetails(id, 'es').subscribe(response => {
      this.name = response.name;
    }) 
    return this.name;
  }
}

