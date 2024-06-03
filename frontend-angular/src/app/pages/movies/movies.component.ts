import { Component, OnInit } from '@angular/core';
import { BasesUrls, Movie, TypeObject } from '../../../models/IMovie';
import { HeaderMainComponent } from '../../components/header-main/header-main.component';
import { BodyMainComponent } from '../../components/body-main/body-main.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiMovieService } from '../../services/api.movies';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [HeaderMainComponent, BodyMainComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  listMovies: Movie[] = [];
  selectedType?: TypeObject;
  movieDataSelected!: Movie;
  id: string = "";
  baseUrl: string = BasesUrls.movies;

  constructor(private route: ActivatedRoute, private _apiMovieService: ApiMovieService) { }

  ngOnInit(): void {
    this.getAll();
    this.getIdByUrlRouter();
  }

  private getIdByUrlRouter(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.onIdChanged(this.id);
    });
  }

  private getAll() {
    this._apiMovieService.getAll().subscribe((data: any) => {
      this.listMovies = data;
      this.movieDataSelected = data[0];
    })
  }

  public onMovieSelected(movie: any): void {
    this.movieDataSelected = movie;
  }

  private onIdChanged(newId: string): void {
    const foundMovie = this.listMovies.find(movie => movie.id === newId);
    if (foundMovie) {
      this.movieDataSelected = foundMovie;
    } else {
      this.movieDataSelected = this.listMovies[0];
    }
  }
}
