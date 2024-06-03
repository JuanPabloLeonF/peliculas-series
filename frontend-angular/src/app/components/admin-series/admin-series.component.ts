import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { listCategoriesMovies } from '../../../apis/moviesApis';
import { BasesUrls, Categories } from '../../../models/IMovie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Seasons, Series, SeriesSelected } from '../../../models/ISeries';
import { RegisterSeriesComponent } from './register-series/register-series.component';
import { UpdateSeriesComponent } from './update-series/update-series.component';
import { ApiSeriesService } from '../../services/api.series';
import { SelectedCreatedSeriesOrSeaonsComponent } from './selected-created-series-or-seaons/selected-created-series-or-seaons.component';

@Component({
  selector: 'app-admin-series',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterSeriesComponent, UpdateSeriesComponent, SelectedCreatedSeriesOrSeaonsComponent],
  templateUrl: './admin-series.component.html',
  styleUrl: './admin-series.component.css'
})
export class AdminSeriesComponent implements OnInit {
  @Output() onMenuBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  showRegisterPanel: boolean = false;
  showUpdateDataPanel: boolean = false;
  showSelectedSeriesPanel: boolean = false;
  listSeries: Series[] = [];
  listDataSeries: Series[] = [];
  listCategories: Categories[] = listCategoriesMovies;
  valueSelect: Categories = "ALL";
  searchValue: string = "";
  seriesSelected!: SeriesSelected;
  baseUrl: string = BasesUrls.series;
  idSeriesSelected: string = "";

  constructor(private _apiSeriesService: ApiSeriesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this._apiSeriesService.getAll().subscribe((data: any) => {
      this.listDataSeries = data;
      this.listSeries = data;
    })
  }

  public onChangeSearchValue(): void {
    const searchLowerCase = this.searchValue.toLowerCase();
    this.listSeries = this.listDataSeries.filter((series) =>
      series.seasons.some((serie) => serie.title.toLowerCase().includes(searchLowerCase))
    );
  }

  public onChangeSelectValue(): void {
    if (this.valueSelect === "ALL") {
      this.listSeries = this.listDataSeries;
    } else if (this.valueSelect === "Accion") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Terror") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Comedia") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Fantasia") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Miedo") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else if (this.valueSelect === "Drama") {
      this.listSeries = this.listDataSeries.filter((series) => series.category.includes(this.valueSelect));
    } else {
      this.listSeries = this.listDataSeries;
    }
  }

  public onDeleteData(event: Event, id: string): void {
    event.stopPropagation();
    this._apiSeriesService.deleteSeasonById(id).subscribe((data: any) => {
      alert("Se ha eliminado correctamente la serie");
      this.getAll();
    }, (error: any) => {
      alert("Ocurrio un error no se ha eliminado la serie, error: " + JSON.stringify(error));
    })
  }

  public onMenu(): void {
    this.onMenuBoolean.emit(true);
  }

  public onShowSelectedSeriesPanel(data: boolean): void {
    this.showSelectedSeriesPanel = data;
  }

  public onRegisterDataPanel(data: boolean): void {
    this.showRegisterPanel = data;
    this.getAll();
  }

  public onUpdateDataPanel(data: boolean): void {
    this.showUpdateDataPanel = data;
    this.getAll();
  }

  public onIdSeriesSelected(data: string): void {
    this.idSeriesSelected = data;
  }

  public onUpdateDataMovie(dataSeries: Series, dataSeason: Seasons): void {
    const dataSeriesFormatter: any = {
      id: dataSeries.id,
      category: dataSeries.category,
      season: dataSeason
    }
    this.seriesSelected = dataSeriesFormatter;
    this.onUpdateDataPanel(true);
    alert("TEN EN CUENTA QUE SE ELIMINARAN AUTOMATICAMENTE TODOS LOS CAPITULOS DE LA TEMPORADA POR LO TANTO TENDRAS QUE VOLVER A REGISTRARLOS")
  }
}
