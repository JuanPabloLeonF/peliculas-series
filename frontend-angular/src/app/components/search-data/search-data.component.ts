import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ApiMovieService } from '../../services/api.movies';
import { BasesUrls } from '../../../models/IMovie';
import { ApiSeriesService } from '../../services/api.series';

@Component({
  selector: 'app-search-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-data.component.html',
  styleUrl: './search-data.component.css'
})
export class SearchDataComponent implements OnInit, OnChanges {
  lisMoviesData: any = [];
  listSeriesData: any = [];
  filteredData: any = [];
  @Input() valueInputSearch: string = "";
  baseUrlMovies: string = BasesUrls.movies;
  baseUrlSeries: string = BasesUrls.series;

  constructor(private router: Router, private _apiMovieService: ApiMovieService, private _apiSeriesService: ApiSeriesService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllSeries();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ).subscribe((url: string) => {
      this.filterData(this.valueInputSearch, url);
    });
  }

  private getAll() {
    this._apiMovieService.getAll().subscribe((data: any) => {
      this.lisMoviesData = data;
    })
  }

  private getAllSeries() {
    this._apiSeriesService.getAll().subscribe((data: any) => {
      this.listSeriesData = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['valueInputSearch']) {
      const newValue: string = changes['valueInputSearch'].currentValue.toLowerCase();
      this.filterData(newValue, this.router.url);
    }
  }

  public getData(data: any) {
    const url = this.router.url;
    if (url.startsWith('/series')) {
      this.router.navigate(['/series', data.id]);
      this.valueInputSearch = "";
    } else if (url.startsWith('/movies')) {
      this.router.navigate(['/movies', data.id]);
      this.valueInputSearch = "";
    } else {
      this.filteredData = [];
    }
  }


  private filterData(newValue: string, url: string): void {
    if (newValue === '') {
      this.filteredData = [];
    } else {
      if (url.startsWith('/series')) {
        this.filteredData = this.listSeriesData.filter((series: any) =>
          series.seasons.some((season: any) => season.title.toLowerCase().includes(newValue))
        );
      } else if (url.startsWith('/movies')) {
        this.filteredData = this.lisMoviesData.filter((item: any) =>
          item.title.toLowerCase().includes(newValue)
        );
      } else {
        this.filteredData = [];
      }
    }
  }
}
