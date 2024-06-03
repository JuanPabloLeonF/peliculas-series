import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdmins } from '../../../models/IUser';
import { Router } from '@angular/router';
import { BasesUrls } from '../../../models/IMovie';
import { ApiUsersService } from '../../services/api.users';


@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {
  @Output() onMenuBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  user?: UserAdmins;
  baseUrl: string = BasesUrls.series;

  constructor(private router: Router, private _apiUsersService: ApiUsersService){}
  
  ngOnInit(): void {
    this.getUserByLocalStorage();
  }

  private getById(id: string): void {
    this._apiUsersService.getById(id).subscribe((data: any) => {
      this.user = data;
    })
  }

  private getUserByLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const dataUser: string | null = localStorage.getItem('user');
      if (dataUser !== null) {
        const dataUserLocal = JSON.parse(dataUser);
        this.getById(dataUserLocal.id);
      }
    }
  }

  public onMenu(): void {
    this.onMenuBoolean.emit(true);
  }

  public onLogout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      this.goInit();
    }
  } 

  private goInit(): void {
    this.router.navigate(['init']);
  }
}
