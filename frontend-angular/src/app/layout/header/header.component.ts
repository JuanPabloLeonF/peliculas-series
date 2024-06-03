import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { SearchDataComponent } from '../../components/search-data/search-data.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgClass, RouterLink, SearchDataComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuTransform: string = "translateX(-100%)";
  displayButton: string = "block";
  valueInputSearch: string = "";
  admin!: boolean;
  isAuthenticate!: boolean;
  menuSelected: string = "init";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
    if (typeof localStorage !== 'undefined') {
      const dataUser: string | null = localStorage.getItem('user');
      if (dataUser !== null) {
        const dataUserDb = JSON.parse(dataUser);
        this.admin = dataUserDb.admin;
        this.isAuthenticate = dataUserDb.isAuthenticate;
      }
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == "/movies" || event.url.startsWith("/movies/")) {
          if (typeof localStorage !== 'undefined') {
            const dataUser: string | null = localStorage.getItem('user');
            if (dataUser !== null) {
              const dataUserDb = JSON.parse(dataUser);
              this.admin = dataUserDb.admin;
              this.isAuthenticate = dataUserDb.isAuthenticate;
            }
          }
        }
      }
    });
  }

  public onOption(option: string) {
    this.menuSelected = option;
  }

  public showMenu(): void {
    this.menuTransform = 'translateX(0)';
    this.displayButton = "none";
  }

  public hideMenu(): void {
    this.menuTransform = 'translateX(-100%)';
    this.displayButton = "block";
  }

  private checkScreenSize(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      this.menuTransform = 'translateX(0)';
    }
  }

  public onLogout(): void {
    if (typeof localStorage !== 'undefined') {
      this.isAuthenticate = false;
      localStorage.clear();
    }
  }
}
