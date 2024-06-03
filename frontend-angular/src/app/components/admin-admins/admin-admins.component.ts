import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdmins } from '../../../models/IUser';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { inject } from '@angular/core';
import { ApiUsersService } from '../../services/api.users';
import { BasesUrls } from '../../../models/IMovie';

@Component({
  selector: 'app-admin-admins',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterAdminComponent, UpdateAdminComponent],
  templateUrl: './admin-admins.component.html',
  styleUrl: './admin-admins.component.css'
})
export class AdminAdminsComponent implements OnInit {
  @Output() onMenuBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  showRegisterPanel:boolean = false;
  showUpdateDataPanel: boolean = false;
  listUsers: UserAdmins[] = [];
  listUsersSelects: string[] = ["Administradores", "Usuarios"];
  valueSelect: string = "ALL";
  searchValue: string = "";
  userSelected!: UserAdmins;
  listUsersDataBackend: any = [];
  baseUrl: string = BasesUrls.series;
  private _apiUsersService: ApiUsersService = inject(ApiUsersService);

  ngOnInit(): void {
    this.getALL();
  }

  public onChangeSearchValue(): void {
    this.listUsers = this.listUsersDataBackend.filter((user: any) => user.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  public onChangeSelectValue(): void {
    if (this.valueSelect === "ALL") {
      this.listUsers = this.listUsersDataBackend;
    } else if (this.valueSelect === "Administradores") {
      this.listUsers = this.listUsersDataBackend.filter((user: any) => user.admin === true);
    } else if (this.valueSelect === "Usuarios") {
      this.listUsers = this.listUsersDataBackend.filter((user: any) => user.admin === false);
    } else {
      this.listUsers = this.listUsersDataBackend;
    }
  }

  private getALL(): void {
    this._apiUsersService.getAll().subscribe((data: any) => {
      this.listUsersDataBackend = data;
      this.listUsers = this.listUsersDataBackend;
    })
  }

  public onDeleteData(event: Event, id: string): void {
    event.stopPropagation();
    this._apiUsersService.deleteById(id).subscribe((data: any) => {
      this.getALL();
      alert(`SE HA ELIMINADO CORRECTAMENTE`);
    }, (error) => {
      alert("LO SIENTO NO SE HA PODIDO ELIMINAR");
    })
  }
  

  public onMenu(): void {
    this.onMenuBoolean.emit(true);
  }

  public onRegisterDataPanel(data: boolean): void {
    this.showRegisterPanel = data;
    this.getALL();
  }

  public onUpdateDataPanel(data: boolean): void {
    this.showUpdateDataPanel = data;
    this.getALL();
  }

  public onUpdateDataUser(dataUser: UserAdmins): void {
    this.userSelected = dataUser;
    this.onUpdateDataPanel(true);
    this.getALL();
  }
}
