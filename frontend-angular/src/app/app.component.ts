import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd  } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { User } from '../models/IUser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userData?: User;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    if (typeof localStorage !== 'undefined') {
      const userDb: string | null= localStorage.getItem("user");
      if (userDb !== null) {
        this.userData = JSON.parse(userDb);
        localStorage.setItem('admin', JSON.stringify(this.userData?.admin));
      }
    }
  }
}
