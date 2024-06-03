import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { listCategoriesMovies } from '../../../../apis/moviesApis';
import { Categories } from '../../../../models/IMovie';
import { ApiMovieService } from '../../../services/api.movies';

@Component({
  selector: 'app-register-data-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-data-panel.component.html',
  styleUrl: './register-data-panel.component.css'
})
export class RegisterDataPanelComponent {

  @Output() closePanel = new EventEmitter<boolean>();
  listCategories: Categories[] = listCategoriesMovies;
  formularyRegisterData: FormGroup;
  activateSectionFormulary = {
    part1: true,
    part2: false
  };
  stringFileImage: string = "SELECCIONA IMAGEN";
  stringFileTrailerVideo: string = "SELECCIONA TRAILER";
  stringFileVideo: string = "SELECCIONA VIDEO";

  constructor(private formBuilder: FormBuilder, private _apiMoviesService: ApiMovieService) {
    this.formularyRegisterData = this.formBuilder.group({
      title: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      category: ["", [
        Validators.required,
      ]],
      date: ["", [
        Validators.required,
      ]],
      rating: ["", [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/),
        this.ratingValidator
      ]],
      description: ["", [
        Validators.required,
        Validators.minLength(10),
      ]],
      image: ["", [
        Validators.required
      ]],
      trailerVideo: ["", [
        Validators.required
      ]],
      video: ["", [
        Validators.required
      ]],
    });
  }

  private createData(): void {
    const formData = new FormData();
    formData.append('title', this.formularyRegisterData.get('title')?.value);
    formData.append('description', this.formularyRegisterData.get('description')?.value);
    formData.append('category', JSON.stringify(this.formularyRegisterData.get('category')?.value));
    formData.append('rating', this.formularyRegisterData.get('rating')?.value);
    formData.append('date', this.formularyRegisterData.get('date')?.value);

    const imageFile = (document.getElementById('image') as HTMLInputElement).files?.[0];
    const trailerVideoFile = (document.getElementById('trailerVideo') as HTMLInputElement).files?.[0];
    const videoFile = (document.getElementById('video') as HTMLInputElement).files?.[0];

    if (imageFile) formData.append('image', imageFile);
    if (trailerVideoFile) formData.append('trailerVideo', trailerVideoFile);
    if (videoFile) formData.append('video', videoFile);

    this._apiMoviesService.create(formData).subscribe((data: any) => {
      this.formularyRegisterData.clearValidators();
      this.formularyRegisterData.reset();
      this.formularyRegisterData.get('category')?.setValue('');
      this.closePanelData(false);
      alert("SE HA REGISTRADO CORRECTAMENTE LA PELICULA");
    }, (error: any) => {
      alert("Error al registrar la película. Por favor, revisa los datos y vuelve a intentarlo.");
    });
  }


  private ratingValidator(control: AbstractControl): { [key: string]: any } | null {
    const rating = parseFloat(control.value);
    if (isNaN(rating) || rating < 1.0 || rating > 10.0) {
      return { 'invalidRating': true };
    }
    return null;
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
      try {
        this.createData();
      } catch (error) {
        console.log("error: ", error);
      }
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

  public onFileChangeTrailerVideo(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.stringFileTrailerVideo = fileName;
    } else {
      this.stringFileTrailerVideo = "SELECCIONA TRAILER";
    }
  }

  public onFileChangeVideo(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.stringFileVideo = fileName;
    } else {
      this.stringFileVideo = "SELECCIONA VIDEO";
    }
  }

  public onContinue(): void {
    if (this.formularyRegisterData.invalid) {
      const errors = [];
      const fieldsToCheck = ['title', 'category', 'date', 'rating', 'description'];

      for (const fieldName of fieldsToCheck) {
        const control = this.formularyRegisterData.get(fieldName);
        if (control?.invalid) {
          for (const errorType in control?.errors) {
            if (errorType) {
              errors.push(this.getError(fieldName, errorType));
            }
          }
        }
      }

      if (errors.length > 0) {
        alert(errors.join(', '));
      } else {
        this.activateSectionFormulary = {
          part1: false,
          part2: true
        };
      }
    } else {
      this.activateSectionFormulary = {
        part1: false,
        part2: true
      }
    }
  }


  public hasError(field: string, typeError: any) {
    const control = this.formularyRegisterData.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  private getError(controlName: string, errorType: string): string {
    if (controlName == "title") {
      controlName = "Titulo"
    } else if (controlName == "category") {
      controlName = "Categorias"
    } else if (controlName == "date") {
      controlName = "Fecha"
    } else if (controlName == "rating") {
      controlName = "Rating"
    } else if (controlName == "description") {
      controlName = "Descripcion"
    } else if (controlName == "image") {
      controlName = "Imagen"
    } else if (controlName == "trailerVideo") {
      controlName = "trailerVideo"
    } else if (controlName == "video") {
      controlName = "video"
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

  public goBack(): void {
    this.activateSectionFormulary = {
      part1: true,
      part2: false
    }
  }
}
