import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seasons, Series, Videos } from '../../../models/ISeries';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiSeriesService } from '../../services/api.series';
import { BasesUrls } from '../../../models/IMovie';

@Component({
  selector: 'app-watch-series',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './watch-series.component.html',
  styleUrl: './watch-series.component.css'
})
export class WatchSeriesComponent implements OnInit {

  id: string = "0";
  selectedIndex: number = 0;
  dataSeries!: Series;
  videos: Videos[] = [];
  activateRemove: boolean = false;
  chapter?: Videos;
  activateControls: boolean = true;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  valueSelect: string = "";
  listSeasons: Seasons[] = [];
  season!: Seasons;
  baseUrl: string = BasesUrls.series;

  constructor(private route: ActivatedRoute, private _apiSeriesServices: ApiSeriesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDataById(this.id);
      this.getAllChapter();
    });
    this.checkScreenSize();
  }

  onFullscreenChange(event: Event): void {
    const videoElement = this.videoPlayer.nativeElement as HTMLVideoElement;
    if (videoElement === document.fullscreenElement) {
      this.activateRemove = true;
    } else {
      this.activateRemove = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  public watchChapter(): void {
    this.activateRemove = true;
    const videoElement = this.videoPlayer.nativeElement as HTMLVideoElement;
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.activateControls = false;
    }
  }

  public changeIndex(index: number) {
    const newIndex = this.selectedIndex + index;
    const seasonIndex = 0;
    const listVideos = this.season.videos;
    if (newIndex >= 0 && newIndex < listVideos.length) {
      this.selectedIndex = newIndex;
    }
  }

  public getDataVideos(data: Videos): void {
    this.chapter = data;
  }

  private getDataById(id: string): void {
    this._apiSeriesServices.getById(id).subscribe((data: any) => {
      this.dataSeries = data;
      this.season = this.dataSeries.seasons[0];
      this.getAllChapter();
    });
  }

  public selectedSeason(): void {
    this.season = this.dataSeries.seasons.find((season) => season.id == this.valueSelect)!;
    this.getAllChapter();
    this.selectedIndex = 0;
  }

  private getAllChapter(): void {
    this.videos = this.season?.videos || [];
  }
}
