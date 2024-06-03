import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasesUrls, Movie } from '../../../../models/IMovie';
import { CommonModule } from '@angular/common';
import { Series } from '../../../../models/ISeries';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css'
})
export class ListMoviesComponent {
  selectedIndex: number = 0;
  @Input() listDataByCategory!: any;
  @Input() nameCategory!: string;
  @Output() dataSelected = new EventEmitter<Movie | Series>();
  baseUrlMovies: string = BasesUrls.movies;
  baseUrlSeries: string = BasesUrls.series;

  public changeIndex(index: number) {
    const newIndex = this.selectedIndex + index;
    if (newIndex >= 0 && newIndex < this.listDataByCategory.length) {
      this.selectedIndex = newIndex;
    }
  }

  public getData(data: Movie | Series): void {
    this.dataSelected.emit(data);
  }
}
