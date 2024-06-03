import { NgClass } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserLogin } from '../../../models/IUser';
import { Router } from '@angular/router';
import { ApiUsersService } from '../../services/api.users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formularyLogin: FormGroup;
  @Output() dataSection = new EventEmitter<any>();
  private _apiUsersService = inject(ApiUsersService);

  public activateSection(value: string): void {
    const data = {
      login: false,
      password: false,
      register: false
    }

    if (value === "login") {
      data.login = true;
    } else if (value === "password") {
      data.password = true;
    } else if (value === "register") {
      data.register = true;
    } else {
      data.login = true;
    }

    this.dataSection.emit(data);
  }


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formularyLogin = this.formBuilder.group({
      username: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')
      ]]
    });
  }

  public onSubmit(event: any) {
    event.preventDefault();
    if (this.formularyLogin.invalid) {
      const errors = [];
      for (const controlName in this.formularyLogin.controls) {
        const control = this.formularyLogin.get(controlName);
        if (control?.invalid) {
          for (const errorType in control?.errors) {
            if (errorType) {
              errors.push(this.getError(controlName, errorType));
            }
          }
        }
      }
      alert(errors.join(', '));
    } else {
      const userLogin: UserLogin = {
        username: this.formularyLogin.value.username,
        password: this.formularyLogin.value.password,
      }

      this._apiUsersService.getByUsername(userLogin.username).subscribe((data: any) => {
        const user: User = {
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email,
          password: data.password,
          admin: data.admin,
          isAuthenticate: true
        }
        if (this.validatiorUserData(user, userLogin)) {
          this.formularyLogin.clearValidators();
          this.formularyLogin.reset();
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.goMovies();
        } else {
          alert("El usuario o la contraseña no estan registrado");
        }
      }, (error) => {
        alert("EL USUARIO NO ESTA REGISTRADO")
      })
    }
  }

  private validatiorUserData(userDb: User, userLogin: UserLogin): boolean {
    if (userDb.username == userLogin.username && userDb.password == userLogin.password) {
      return true;
    } else {
      return false;
    }
  }

  public hasError(field: string, typeError: any) {
    const control = this.formularyLogin.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  private getError(controlName: string, errorType: string): string {
    if (controlName == "password") {
      controlName = "contraseña"
    } else {
      controlName = "usuario"
    }
    switch (errorType) {
      case 'required':
        return `${controlName} es requerido`;
      case 'minlength':
        return `${controlName} debe tener al menos 5 caracteres`;
      case 'maxlength':
        return `${controlName} no puede tener más de 15 caracteres`;
      case 'pattern':
        return `${controlName} debe tener al menos una mayúscula, una minúscula y un número y no tener espacios`;
      default:
        return `${controlName} tiene un error desconocido`;
    }
  }

  private goMovies(): void {
    this.router.navigate(['movies']);
  }
}
