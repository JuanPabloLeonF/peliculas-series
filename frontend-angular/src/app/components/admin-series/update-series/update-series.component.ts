import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { listCategoriesMovies } from '../../../../apis/moviesApis';
import { Categories } from '../../../../models/IMovie';
import { SeriesSelected } from '../../../../models/ISeries';
import { ApiSeriesService } from '../../../services/api.series';

@Component({
  selector: 'app-update-series',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-series.component.html',
  styleUrl: './update-series.component.css'
})
export class UpdateSeriesComponent implements OnInit {
  @Output() closePanel = new EventEmitter<boolean>();
  @Input() seriesSelected!: any;
  listCategories: Categories[] = listCategoriesMovies;
  formularyRegisterData: FormGroup;
  formularyRegisterDataChapter: FormGroup;
  activateSectionFormulary = {
    part1: true,
    part2: false,
    part3: false
  };
  stringFileImage: string = "SELECCIONA PORTADA";
  stringFileTrailerVideo: string = "SELECCIONA TRAILER";
  stringFileVideo: string = "SELECCIONA VIDEO";
  stringFileImageChapter: string = "PORTADA CAPITULO";
  stringFileVideoChapter: string = "VIDEO CAPITULO";
  numberVideos: any = [];
  videos: any = [];
  selectedIndex: number = 0;
  dataImgChange: any = "";
  dataTrailerVideo: any = "";
  seasonsId: string = "";

  constructor(private formBuilder: FormBuilder, private _apiSeriesService: ApiSeriesService) {
    this.formularyRegisterData = this.formBuilder.group({});
    this.formularyRegisterDataChapter = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.numberVideos = Array.from({ length: this.seriesSelected.season.numberEpisodes }, (_, index) => index + 1);

    this.stringFileImage = "SELECCIONA PORTADA";
    this.stringFileTrailerVideo = "SELECCIONA TRAILER";
    this.stringFileVideo = "SELECCIONA VIDEO";
    this.stringFileImageChapter = "PORTADA CAPITULO";
    this.stringFileVideoChapter = "VIDEO CAPITULO";

    this.formularyRegisterData = this.formBuilder.group({
      title: [this.seriesSelected.season.title, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      category: [this.seriesSelected.category, [
        Validators.required,
      ]],
      date: [this.seriesSelected.season.date, [
        Validators.required,
      ]],
      rating: [this.seriesSelected.season.rating, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/),
        this.ratingValidator
      ]],
      numberEpisodes: [this.seriesSelected.season.numberEpisodes, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ]],
      description: [this.seriesSelected.season.description, [
        Validators.required,
        Validators.minLength(10)
      ]],
      img: ["", [
        Validators.required
      ]],
      trailerVideo: ["", [
        Validators.required
      ]]
    });

    this.formularyRegisterDataChapter = this.formBuilder.group({
      titleChapter: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      imgChapter: ["", [
        Validators.required
      ]],
      videoChapter: ["", [
        Validators.required
      ]],
      descriptionChapter: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
    });
  }

  private updateSeries(): void {
    const formData = new FormData();

    formData.append("category", JSON.stringify(this.formularyRegisterData.get('category')?.value))

    this._apiSeriesService.updateSeriesById(formData, this.seriesSelected.id).subscribe((data: any) => {
      this.updateSeasons(data.id);
    }, (error: any) => {
      alert("Error al registrar la serie. Por favor, revisa los datos y vuelve a intentarlo.");
    });
  }

  private async updateSeasons(seriesId: string) {
    const formData = new FormData();
    const title = this.formularyRegisterData.get('title')?.value;
    const description = this.formularyRegisterData.get('description')?.value;
    const numberEpisodes = this.formularyRegisterData.get('numberEpisodes')?.value;
    const date = this.formularyRegisterData.get('date')?.value;
    const rating = this.formularyRegisterData.get('rating')?.value;
    formData.append("img", this.dataImgChange);
    formData.append("trailerVideo", this.dataTrailerVideo);
    if (title !== null) formData.append("title", title);
    if (description !== null) formData.append("description", description);
    if (numberEpisodes !== null) formData.append("numberEpisodes", numberEpisodes);
    if (date !== null) formData.append("date", date);
    if (rating !== null) formData.append("rating", rating);

    formData.append("series", seriesId);

    this._apiSeriesService.deleteVideosBySeason(this.seriesSelected.season.id).subscribe((data: any) => {
      this._apiSeriesService.updateSeasonById(formData, this.seriesSelected.season.id).subscribe((data: any) => {
        this.seasonsId = data.id;
      }, (error: any) => {
        console.error('Error al actualizr la seasons:', error);
      });
    }, (error: any) => {
      console.error("lo siento ocurrio algo a la hora de eliminar videos");
    })
  }

  public onUpdateVideoByChapter(selectedIndex: number): void {
    const formData = new FormData();
    const videoInput = document.getElementById(`videoChapter${selectedIndex}`) as HTMLInputElement;
    const imgInput = document.getElementById(`imgChapter${selectedIndex}`) as HTMLInputElement;
    const titleChapter = this.formularyRegisterDataChapter.get('titleChapter')?.value;
    const descriptionChapter = this.formularyRegisterDataChapter.get('descriptionChapter')?.value;

    if (titleChapter) formData.append("title", titleChapter);
    if (descriptionChapter) formData.append("description", descriptionChapter);

    if (videoInput && videoInput.files?.length) {
      formData.append(`video`, videoInput.files[0]);
    }

    if (imgInput && imgInput.files?.length) {
      formData.append(`img`, imgInput.files[0]);
    }

    if (this.seasonsId) formData.append("videos", this.seasonsId);

    this._apiSeriesService.createVideos(formData).subscribe((data: any) => {
      this.formularyRegisterDataChapter.clearValidators();
      this.formularyRegisterDataChapter.reset();
      this.stringFileImageChapter = "PORTADA CAPITULO";
      this.stringFileVideoChapter = "VIDEO CAPITULO";
      this.changeIndex(1);
    }, (error: any) => {
      console.error('Error al crear el video:', error);
    });
  }

  private updateVideos(): void {
    const formData = new FormData();
    const videoInput = document.getElementById(`videoChapter${this.selectedIndex}`) as HTMLInputElement;
    const imgInput = document.getElementById(`imgChapter${this.selectedIndex}`) as HTMLInputElement;
    const titleChapter = this.formularyRegisterDataChapter.get('titleChapter')?.value;
    const descriptionChapter = this.formularyRegisterDataChapter.get('descriptionChapter')?.value;

    if (titleChapter) formData.append("title", titleChapter);
    if (descriptionChapter) formData.append("description", descriptionChapter);

    if (videoInput && videoInput.files?.length) {
      formData.append(`video`, videoInput.files[0]);
    }

    if (imgInput && imgInput.files?.length) {
      formData.append(`img`, imgInput.files[0]);
    }

    if (this.seasonsId) formData.append("videos", this.seasonsId);

    this._apiSeriesService.createVideos(formData).subscribe((data: any) => {
      this.formularyRegisterDataChapter.clearValidators();
      this.formularyRegisterDataChapter.reset();
      this.formularyRegisterData.clearValidators();
      this.formularyRegisterData.reset();
      this.stringFileImageChapter = "PORTADA CAPITULO";
      this.stringFileVideoChapter = "VIDEO CAPITULO";
      alert("SE HA ACTUALIZADO EXITOSAMENTE LA SERIE")
      this.closePanelData(false);
    }, (error: any) => {
      console.error('Error al crear el video:', error);
    });
  }

  public changeIndex(index: number) {
    const newIndex = this.selectedIndex + index;
    const listFormularies = this.numberVideos.length;
    if (newIndex >= 0 && newIndex < listFormularies) {
      this.selectedIndex = newIndex;
    }
  }

  public onNumberEpisodesChange(event: any) {
    this.numberVideos = Array.from({ length: parseInt(event.target.value) }, (_, index) => index + 1);
  }

  private ratingValidator(control: AbstractControl): { [key: string]: any } | null {
    const rating = parseFloat(control.value);
    if (isNaN(rating) || rating < 1.0 || rating > 10.0) {
      return { 'invalidRating': true };
    }
    return null;
  }

  public onSubmitFormularyRegisterData(event: any) {
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
      if (errors.length > 0) {
        alert(errors.join(', '));
      } else {
        this.updateSeries();
        this.activateSectionFormulary = {
          part1: false,
          part2: false,
          part3: true
        };
      }
    } else {
      this.updateSeries();
      this.activateSectionFormulary = {
        part1: false,
        part2: false,
        part3: true
      };
    }
  }

  public onSubmitFormularyRegisterDataChapter(event: any) {
    event.preventDefault();
    if (this.formularyRegisterDataChapter.invalid) {
      const errors = [];
      for (const controlName in this.formularyRegisterDataChapter.controls) {
        const control = this.formularyRegisterDataChapter.get(controlName);
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
      if (this.selectedIndex === this.numberVideos.length - 1) {
        this.updateVideos();
      } else {
        this.formularyRegisterDataChapter.clearValidators();
        this.formularyRegisterDataChapter.reset();
        this.stringFileImageChapter = "PORTADA CAPITULO";
        this.stringFileVideoChapter = "VIDEO CAPITULO";
        this.changeIndex(1);
      }
    }
  }

  public onFileChangeImageChapter(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.stringFileImageChapter = fileName;
    } else {
      this.stringFileImageChapter = "PORTADA CAPITULO";
    }
  }

  public onFileChangeVideoChapter(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.stringFileVideoChapter = fileName;
    } else {
      this.stringFileVideoChapter = "VIDEO CAPITULO";
    }
  }

  public onFileChangeImage(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.dataImgChange = file;
      this.stringFileImage = file.name;
    } else {
      this.dataImgChange = null;
      this.stringFileImage = "SELECCIONA LA IMAGEN";
    }
  }

  public onFileChangeTrailerVideo(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.dataTrailerVideo = file;
      this.stringFileTrailerVideo = file.name;
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
          part2: true,
          part3: false
        };
      }
    } else {
      this.activateSectionFormulary = {
        part1: false,
        part2: true,
        part3: false,
      }
    }
  }

  public onContinuePart3(): void {
    if (this.formularyRegisterData.invalid) {
      const errors = [];
      const fieldsToCheck = ['numberEpisodes', 'img', 'trailerVideo'];

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
          part2: false,
          part3: true
        };
      }
    } else {
      this.activateSectionFormulary = {
        part1: false,
        part2: false,
        part3: true,
      }
    }
  }


  public hasError(field: string, typeError: any) {
    const control = this.formularyRegisterData.get(field) || this.formularyRegisterDataChapter.get(field);
    return control?.dirty && control?.hasError(typeError);
  }

  public hasErrorFormularyRegisterDataChapter(field: string, typeError: any) {
    const control = this.formularyRegisterDataChapter.get(field);
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
    } else if (controlName == "img") {
      controlName = "Imagen"
    } else if (controlName == "trailerVideo") {
      controlName = "trailerVideo"
    } else if (controlName == "videos") {
      controlName = "Episodios video"
    } else if (controlName == "numberEpisodes") {
      controlName = "N° episodios"
    } else if (controlName == "titleChapter") {
      controlName = "Titulo episodio"
    } else if (controlName == "descriptionChapter") {
      controlName = "Descripcion episodio"
    } else if (controlName == "imgChapter") {
      controlName = "Imagen episodio"
    } else if (controlName == "videoChapter") {
      controlName = "Video episodio"
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

  public goBackPart1(): void {
    this.activateSectionFormulary = {
      part1: true,
      part2: false,
      part3: false
    }
  }
  public goBackPart2(): void {
    this.activateSectionFormulary = {
      part1: false,
      part2: true,
      part3: false
    }
  }
}
