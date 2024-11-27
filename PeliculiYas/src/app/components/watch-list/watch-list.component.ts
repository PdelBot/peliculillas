import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent {
  constructor(private router: Router) { }

  navigateToMovies(): void {
    this.router.navigate(['watchlist/movies']);
  }

  navigateToSeries(): void {
    this.router.navigate(['watchlist/series']);
  }
}
