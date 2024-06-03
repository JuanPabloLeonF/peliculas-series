import { Component, OnInit } from '@angular/core';
import { BasesUrls, TypeObject } from '../../../models/IMovie';
import { HeaderMainComponent } from '../../components/header-main/header-main.component';
import { BodyMainComponent } from '../../components/body-main/body-main.component';
import { Series } from '../../../models/ISeries';
import { ActivatedRoute } from '@angular/router';
import { ApiSeriesService } from '../../services/api.series';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [HeaderMainComponent, BodyMainComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {
  listSeries: Series[] = [];
  selectedType?: TypeObject;
  seriesDataSelected!: Series;
  id: string = "";
  seriesActivate: boolean = true;
  baseUrl: string = BasesUrls.series;

  constructor(private route: ActivatedRoute, private _apiSeriesService: ApiSeriesService) { }

  ngOnInit(): void {
    this.getAll();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.onIdChanged(this.id);
    });
  }

  private getAll(): void {
    this._apiSeriesService.getAll().subscribe((data: any) => {
      this.listSeries = data;
      this.seriesDataSelected = data[0];
    })
  }

  public onSeriesSelected(series: any): void {
    this.seriesDataSelected = series;
  }

  private onIdChanged(newId: string): void {
    const foundSeries = this.listSeries.find(series => series.id === newId);
    if (foundSeries) {
      this.seriesDataSelected = foundSeries;
    } else {
      this.seriesDataSelected = this.listSeries[0];
    }
  }
}
