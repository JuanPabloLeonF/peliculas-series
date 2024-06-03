import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterDataPanelComponent } from './register-data-panel/register-data-panel.component';
import { listCategoriesMovies, listMoviesDataBackend } from '../../../apis/moviesApis';
import { BasesUrls, Categories, Movie } from '../../../models/IMovie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateDataPanelComponent } from './update-data-panel/update-data-panel.component';
import { ApiMovieService } from '../../services/api.movies';

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  imports: [RegisterDataPanelComponent, CommonModule, FormsModule, UpdateDataPanelComponent],
  templateUrl: './admin-movies.component.html',
  styleUrl: './admin-movies.component.css'
})
export class AdminMoviesComponent implements OnInit {

  @Output() onMenuBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  showRegisterPanel: boolean = false;
  showUpdateDataPanel: boolean = false;
  listMovies: Movie[] = [];
  listDataAllMovies: Movie[] = [];
  listCategories: Categories[] = listCategoriesMovies;
  valueSelect: Categories = "ALL";
  searchValue: string = "";
  movieSelected!: Movie;
  baseUrls: string = BasesUrls.movies;

  constructor(private _apiMoviesService: ApiMovieService) { }

  ngOnInit(): void {
    this.getAll();
  }

  public onChangeSearchValue(): void {
    this.listMovies = this.listDataAllMovies.filter((movie) => movie.title.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  public onChangeSelectValue(): void {
    if (this.valueSelect === "ALL") {
      this.listMovies = this.listDataAllMovies;
    } else if (this.valueSelect === "Accion") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Terror") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Comedia") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Fantasia") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Miedo") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Drama") {
      this.listMovies = this.listDataAllMovies.filter((movie) => movie.category.includes(this.valueSelect));
    } else {
      this.listMovies = this.listDataAllMovies;
    }
  }

  private getAll(): void {
    this._apiMoviesService.getAll().subscribe((data: any) => {
      this.listDataAllMovies = data;
      this.listMovies = data;
    })
  }

  public onDeleteData(event: Event, id: string): void {
    event.stopPropagation();
    this._apiMoviesService.deleteById(id).subscribe((data: any) => {
      alert(`Eliminar película con ID: ${id}`);
      this.getAll();
    });
  }


  public onMenu(): void {
    this.onMenuBoolean.emit(true);
  }

  public onRegisterDataPanel(data: boolean): void {
    this.showRegisterPanel = data;
    this.getAll();
  }

  public onUpdateDataPanel(data: boolean): void {
    this.showUpdateDataPanel = data;
    this.getAll();
  }

  public onUpdateDataMovie(dataMovie: Movie): void {
    this.movieSelected = dataMovie;
    this.onUpdateDataPanel(true);
  }
}
