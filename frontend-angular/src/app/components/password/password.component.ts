import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiUsersService } from '../../services/api.users';
import { User } from '../../../models/IUser';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

  formularyRegister: FormGroup;
  @Output() goBackValue = new EventEmitter<any>();
  private _apiUsersService = inject(ApiUsersService);

  constructor(private formBuilder: FormBuilder) {
    this.formularyRegister = this.formBuilder.group({
      passwordNew: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')
      ]],
      passwordConfirm: ["", [
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
      if (this.formularyRegister.value.passwordNew !== this.formularyRegister.value.passwordConfirm) {
        alert("LAS CONTRASEÑAS NO COINCIDEN");
        return;
      } else {
        const formData = new FormData();
        formData.append("email", this.formularyRegister.value.email);
        formData.append("password", this.formularyRegister.value.passwordConfirm);

        this._apiUsersService.updatePasswordByEmail(formData).subscribe((data: any) => {
          this.formularyRegister.clearValidators();
          this.formularyRegister.reset();
          if (typeof localStorage !== 'undefined') {
            const userDb: string | null = localStorage.getItem("user");
            if (userDb !== null) {
              const user: User = JSON.parse(userDb);
              user.password = data.password;
              localStorage.setItem("user", JSON.stringify(user));
            }
          }
          alert("CONTRASEÑA CAMBIADA CORRECATMENTE");
          this.goBack();
        }, (error) => {
          alert("OCURRIO UN ERROR AL TRATAR DE CAMBIAR LA CONTRASEÑA");
          console.log("error: " + error);
        })
      }
    }
  }

  public hasError(field: string, typeError: any) {
    const control = this.formularyRegister.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  private getError(controlName: string, errorType: string): string {
    const fieldNames: { [key: string]: string } = {
      'passwordNew': 'Nueva Contraseña',
      'passwordConfirm': 'Confirmar Contraseña',
      'email': 'Correo electronico'
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
