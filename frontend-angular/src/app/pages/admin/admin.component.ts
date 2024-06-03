import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminMoviesComponent } from '../../components/admin-movies/admin-movies.component';
import { AdminAdminsComponent } from '../../components/admin-admins/admin-admins.component';
import { AdminProfileComponent } from '../../components/admin-profile/admin-profile.component';
import {AdminSeriesComponent} from '../../components/admin-series/admin-series.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, AdminMoviesComponent, AdminAdminsComponent, AdminProfileComponent, AdminSeriesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
 
  menu: boolean = true;
  sectionActive = {
    activeMovies: true,
    activeSeries: false,
    activeAdmin: false,
    activeProfile: false
  }

  constructor(private router: Router){}

  public onMenu(data: any): void {
    if (data == true) {
      this.menu = true;
    } else {
      this.menu = false;
    }
  }

  public onSection(section: string): void {
    switch (section) {
      case "movies":
        this.sectionActive = {
          activeMovies: true,
          activeSeries: false,
          activeAdmin: false,
          activeProfile: false
        }
        break;
      case "series":
        this.sectionActive = {
          activeMovies: false,
          activeSeries: true,
          activeAdmin: false,
          activeProfile: false
        }
        break;
      case "admins":
        this.sectionActive = {
          activeMovies: false,
          activeSeries: false,
          activeAdmin: true,
          activeProfile: false
        }
        break;
      case "profile":
          this.sectionActive = {
            activeMovies: false,
            activeSeries: false,
            activeAdmin: false,
            activeProfile: true
          }
          break;
    }
  }

  public onMovies(): void {
    this.router.navigate(['movies']);
  }
}
