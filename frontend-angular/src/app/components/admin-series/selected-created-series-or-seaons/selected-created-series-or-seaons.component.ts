import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Series } from '../../../../models/ISeries';
import { ApiSeriesService } from '../../../services/api.series';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-created-series-or-seaons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-created-series-or-seaons.component.html',
  styleUrl: './selected-created-series-or-seaons.component.css'
})
export class SelectedCreatedSeriesOrSeaonsComponent implements OnInit {

  @Output() closeSelectedCreated: any = new EventEmitter<boolean>();
  @Output() activate: any = new EventEmitter<boolean>();
  @Output() idSeriesSelected: any = new EventEmitter<string>();
  valueSelected: string = "";
  listSeries: Series[] = [];

  constructor(private _apiSeriesService: ApiSeriesService) { }

  ngOnInit(): void {
    this._apiSeriesService.getAll().subscribe((data: any) => {
      this.listSeries = data;
    })
  }

  public goBackPart(): void {
    this.closeSelectedCreated.emit(false);
  }

  public onValueChange(event: any): void {
    this.valueSelected = event.target.value;
    if (event.target.value === "series") {
      this.valueSelected = "";
      this.idSeriesSelected.emit("");
      this.activate.emit(true);
      this.goBackPart();
    } else if (event.target.value === "season") {
      this.valueSelected = event.target.value;
    }
  }

  public onValueChangeSeries(event: any): void {
    this.activate.emit(true);
    this.idSeriesSelected.emit(event.target.value);
    this.goBackPart();
  }
}
