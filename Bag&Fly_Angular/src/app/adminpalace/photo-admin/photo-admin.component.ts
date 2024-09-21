import { Component } from '@angular/core';
import { ApiService } from 'src/Services/api-service.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Photo } from 'src/Modeles/Photo';

@Component({
  selector: 'app-photo-admin',
  templateUrl: './photo-admin.component.html',
  styleUrls: ['./photo-admin.component.css'],
})
export class PhotoAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  photos: Photo[] = [];
  newPhoto: Photo = {
    id: 0,
    photo1: '',
    photo2: '',
    photo3: '',
    photo4: '',
    photo5: '',
    hotel_id: 0,
  };
  editedPhoto: Photo = {
    id: 0,
    photo1: '',
    photo2: '',
    photo3: '',
    photo4: '',
    photo5: '',
    hotel_id: 0,
  };
  addPhotoModalVisible: boolean = false;
  editPhotoModalVisible: boolean = false;

  constructor(private api: ApiService) {}

  refreshData() {
    this.api.getData('photos').subscribe((data: Photo[]) => {
      this.photos = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addPhoto() {
    this.api.postData('photos', this.newPhoto).subscribe(() => {
      this.photos.push(this.newPhoto);
      this.newPhoto = {
        id: 0,
        photo1: '',
        photo2: '',
        photo3: '',
        photo4: '',
        photo5: '',
        hotel_id: 0,
      };
      this.addVerif = 0;
    });
  }

  editPhoto() {
    const formValues = this.formEdit.getRawValue();
    this.editedPhoto.id = formValues.id;
    this.editedPhoto.photo1 = formValues.editPhoto1;
    this.editedPhoto.photo2 = formValues.editPhoto2;
    this.editedPhoto.photo3 = formValues.editPhoto3;
    this.editedPhoto.photo4 = formValues.editPhoto4;
    this.editedPhoto.photo5 = formValues.editPhoto5;
    this.editedPhoto.hotel_id = formValues.editHotelId;

    const index = this.photos.findIndex(
      (photo) => photo.id === this.editedPhoto.id
    );
    if (index !== -1) {
      this.photos[index] = { ...this.editedPhoto };
    }

    this.api
      .putData('photos', this.editedPhoto.id.toString(), this.editedPhoto)
      .subscribe(() => {});
    this.addVerif = 0;
  }

  deletePhoto(index: number) {
    this.photos = this.photos.filter((item) => item.id != index);
    this.api.deleteData('photos', index.toString()).subscribe(() => {});
  }

  toggleAddPhotoModal() {
    this.addPhotoModalVisible = !this.addPhotoModalVisible;
    this.addVerif = 1;
  }

  toggleEditPhotoModal(photo: Photo) {
    this.editPhotoModalVisible = !this.editPhotoModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(photo.id, [Validators.required]),
      editPhoto1: new FormControl(photo.photo1, [Validators.required]),
      editPhoto2: new FormControl(photo.photo2, [Validators.required]),
      editPhoto3: new FormControl(photo.photo3, [Validators.required]),
      editPhoto4: new FormControl(photo.photo4, [Validators.required]),
      editPhoto5: new FormControl(photo.photo5, [Validators.required]),
      editHotelId: new FormControl(photo.hotel_id, [Validators.required]),
    });
  }
}
