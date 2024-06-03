import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasesUrls, Movie } from '../../../models/IMovie';
import { listMoviesDataBackend } from '../../../apis/moviesApis';
import { ApiMovieService } from '../../services/api.movies';

@Component({
  selector: 'app-watch-movies',
  standalone: true,
  imports: [],
  templateUrl: './watch-movies.component.html',
  styleUrl: './watch-movies.component.css'
})
export class WatchMoviesComponent implements OnInit {

  id: string = "";
  dataMovie!: Movie;
  baseUrl: string = BasesUrls.movies;

  constructor(private route: ActivatedRoute, private _apiMoviesService: ApiMovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDataById(this.id);
    });
  }

  private getDataById(id: string): void {
    this._apiMoviesService.getById(id).subscribe((data: any) => {
      this.dataMovie = data;
    });
  }
}
