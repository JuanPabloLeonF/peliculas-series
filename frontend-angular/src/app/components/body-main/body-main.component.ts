import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie, NameCategories } from '../../../models/IMovie';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { Series } from '../../../models/ISeries';

@Component({
  selector: 'app-body-main',
  standalone: true,
  imports: [ListMoviesComponent],
  templateUrl: './body-main.component.html',
  styleUrl: './body-main.component.css'
})
export class BodyMainComponent implements OnInit {

  @Input() listData!: Movie[] | Series[];
  @Output() selectedData = new EventEmitter<Movie | Series>();
  listDataByCategoryAction: Movie[] | Series[] = [];
  listDataByCategoryComedy: Movie[] | Series[] = [];
  listDataByCategoryFantasy: Movie[] | Series[] = [];
  listDataByCategoryTerror: Movie[] | Series[] = [];
  categoryAction: NameCategories = NameCategories.action;
  categoryComedy: NameCategories = NameCategories.comedy;
  categoryFantasy: NameCategories = NameCategories.fantasy;
  categoryTerror: NameCategories = NameCategories.terror;

  ngOnInit(): void {
    this.listDataByCategoryAction = this.getListDataByCategoryAction();
    this.listDataByCategoryComedy = this.getListDataByCategoryComedy();
    this.listDataByCategoryFantasy = this.getListDataByCategoryFantasy();
    this.listDataByCategoryTerror = this.getListDataByCategoryTerror();
  }

  public onDataSelected(data: Movie | Series): void {
    this.selectedData.emit(data);
  }

  private getListDataByCategoryAction(): any {
    return this.listData.filter(movie => movie.category.map(cat => cat.toLowerCase()).some(cat => cat.includes(NameCategories.action)));
  }

  private getListDataByCategoryComedy(): any {
    return this.listData.filter(movie => movie.category.map(cat => cat.toLowerCase()).some(cat => cat.includes(NameCategories.comedy)));
  }  

  private getListDataByCategoryFantasy(): any {
    return this.listData.filter(movie => movie.category.map(cat => cat.toLowerCase()).some(cat => cat.includes(NameCategories.fantasy)));
  }

  private getListDataByCategoryTerror(): any {
    return this.listData.filter(movie => movie.category.map(cat => cat.toLowerCase()).some(cat => cat.includes(NameCategories.terror)));
  }
}
