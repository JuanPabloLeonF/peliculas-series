import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { ApiUsersService } from '../../services/api.users';
import { User } from '../../../models/IUser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formularyRegister: FormGroup;
  @Output() goBackValue = new EventEmitter<any>();
  private _apiUsersService = inject(ApiUsersService);

  constructor(private formBuilder: FormBuilder) {
    this.formularyRegister = this.formBuilder.group({
      username: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')
      ]],
      email: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.email
      ]],
      name: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]+$')
      ]]
    });
  }

  public onSubmit(event: any) {
    event.preventDefault();
    if (this.formularyRegister.invalid) {
      const errors = [];
      for (const controlName in this.formularyRegister.controls) {
        const control = this.formularyRegister.get(controlName);
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
      const formData = new FormData();

      formData.append("username", this.formularyRegister.value.username);
      formData.append("name", this.formularyRegister.value.name);
      formData.append("email", this.formularyRegister.value.email);
      formData.append("password", this.formularyRegister.value.password);
      formData.append("admin", "false");

      this._apiUsersService.create(formData).subscribe((data: any) => {
        this.formularyRegister.clearValidators();
        this.formularyRegister.reset();
        alert("SE HA REGISTRADO CORRECTAMENTE EL USUARIO: " + data.username);
        this.goBack();
      }, (error) => {
        alert("NO SE HA PODIDO REGISTRAR, EL USUARIO O EL CORREO YA EXISTEN");
      })
    }
  }

  public hasError(field: string, typeError: any) {
    const control = this.formularyRegister.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  private getError(controlName: string, errorType: string): string {
    const fieldNames: { [key: string]: string } = {
      'username': 'Usuario',
      'password': 'Contraseña',
      'email': 'Correo electrónico',
      'name': 'Nombre'
    };

    if (fieldNames.hasOwnProperty(controlName)) {
      const fieldName = fieldNames[controlName];

      switch (errorType) {
        case 'required':
          return `${fieldName} es requerido`;
        case 'minlength':
          return `${fieldName} debe tener al menos 5 caracteres`;
        case 'maxlength':
          return `${fieldName} no puede tener más de 15 caracteres`;
        case 'pattern':
          return `${fieldName} debe contener solo letras y espacios`;
        case 'email':
          return `${fieldName} debe ser un correo válido`;
        default:
          return `${fieldName} tiene un error desconocido`;
      }
    } else {
      return `Campo desconocido tiene un error ${errorType}`;
    }
  }

  public goBack(): void {
    const data = {
      login: true,
      password: false,
      register: false
    }

    this.goBackValue.emit(data);
  }
}
