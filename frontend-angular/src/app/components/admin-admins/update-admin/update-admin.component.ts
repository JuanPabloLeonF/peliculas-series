import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAdmins } from '../../../../models/IUser';
import { ApiUsersService } from '../../../services/api.users';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})
export class UpdateAdminComponent implements OnInit {
  @Output() closePanel = new EventEmitter<boolean>();
  @Input() userSelected!: UserAdmins;
  listUsersSelects: string[] = ["Administrador", "Usuario"];
  formularyRegisterData: FormGroup;
  stringFileImage: string = "SELECCIONA IMAGEN";

  constructor(private formBuilder: FormBuilder, private _apiUsersService: ApiUsersService) {
    this.formularyRegisterData = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formularyRegisterData = this.formBuilder.group({
      username: [this.userSelected.username, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: [this.userSelected.email, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.email
      ]],
      name: [this.userSelected.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]+$')
      ]],
      password: [this.userSelected.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')
      ]],
      admin: [this.userSelected.admin, [
        Validators.required
      ]],
      image: ["", []]
    });
  }

  private updateUser(): void {
    const formData = new FormData();
    formData.append("username", this.formularyRegisterData.value.username)
    formData.append("name", this.formularyRegisterData.value.name)
    formData.append("email", this.formularyRegisterData.value.email)
    formData.append("password", this.formularyRegisterData.value.password)
    formData.append("admin", this.formularyRegisterData.value.admin)
    const imageFile = (document.getElementById('image') as HTMLInputElement).files?.[0];
    if (imageFile) formData.append('image', imageFile);

    this._apiUsersService.updateById(formData, this.userSelected.id).subscribe((data: any) => {
      this.formularyRegisterData.clearValidators();
      this.formularyRegisterData.reset();
      this.formularyRegisterData.get('category')?.setValue('');
      alert("SE HA ACTUALIZADO CORRECTAMENTE EL USUARIO: " + data.username);
      this.closePanelData(false);
    }, (error) => {
      alert("LO SIENTO HA OCURRIDO UN ERROR");
      console.log("error: " + error);
    })
  }

  public onSubmit(event: any) {
    event.preventDefault();
    if (this.formularyRegisterData.invalid) {
      const errors = [];
      for (const controlName in this.formularyRegisterData.controls) {
        const control = this.formularyRegisterData.get(controlName);
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
      this.updateUser();
    }
  }

  public onFileChangeImage(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.stringFileImage = fileName;
    } else {
      this.stringFileImage = "SELECCIONA IMAGEN";
    }
  }
  

  public hasError(field: string, typeError: any) {
    const control = this.formularyRegisterData.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  private getError(controlName: string, errorType: string): string {
    if (controlName == "username") {
      controlName = "nombre de usuario"
    } else if (controlName == "email") {
      controlName = "correo"
    } else if (controlName == "name") {
      controlName = "nombre"
    } else if (controlName == "password") {
      controlName = "contraseña"
    } else if (controlName == "admin") {
      controlName = "administrador"
    } else if (controlName == "image") {
      controlName = "Imagen"
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
      case 'invalidRating':
        return `${controlName} debe ser entre 1.0 y 10.0`;
      default:
        return `${controlName} tiene un error desconocido`;
    }
  }

  public closePanelData(data: boolean): void {
    this.closePanel.emit(data);
  }
}
