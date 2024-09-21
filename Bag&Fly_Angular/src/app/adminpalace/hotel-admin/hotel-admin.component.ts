import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/Modeles/Hotel';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.css'],
})
export class HotelAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  hotels: Hotel[] = [];
  newHotel: Hotel = {
    id: 0,
    nomHotel: '',
    adress: '',
    nbEtoile: 0,
    ville: '',
    nbVisiteur: 0,
  };
  editedHotel: Hotel = {
    id: 0,
    nomHotel: '',
    adress: '',
    nbEtoile: 0,
    ville: '',
    nbVisiteur: 0,
  };
  addHotelModalVisible: boolean = false;
  editHotelModalVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}
  refreshData() {
    this.api.getData('hotels').subscribe((data: Hotel[]) => {
      this.hotels = data;
    });
  }
  ngOnInit(): void {
    this.refreshData();
  }

  addHotel() {
    this.api.postData('hotels', this.newHotel).subscribe(() => {});
    this.hotels.push(this.newHotel);
    this.newHotel = {
      id: 0,
      nomHotel: '',
      adress: '',
      nbEtoile: 0,
      ville: '',
      nbVisiteur: 0,
    };
    this.addVerif = 0;
  }

  editHotel() {
    const formValues = this.formEdit.getRawValue();
    this.editedHotel.id = formValues.id;
    this.editedHotel.nomHotel = formValues.editHotelName;
    this.editedHotel.adress = formValues.editHotelAddress;
    this.editedHotel.nbEtoile = formValues.editHotelStarRating;
    this.editedHotel.ville = formValues.editHotelCity;
    this.editedHotel.nbVisiteur = formValues.editHotelVisitorCount;
    console.log(this.editedHotel);

    const index = this.hotels.findIndex(
      (hotel) => hotel.id === this.editedHotel.id
    );
    if (index !== -1) {
      this.hotels[index] = { ...this.editedHotel };
    }

    this.api
      .putData('hotels', this.editedHotel.id.toString(), this.editedHotel)
      .subscribe(() => {});
    this.addVerif = 0;
  }

  deleteHotel(index: number) {
    console.log(index);
    this.hotels = this.hotels.filter((item) => item.id != index);
    this.api.deleteData('hotels', index.toString()).subscribe(() => {});
  }

  toggleAddHotelModal() {
    this.addHotelModalVisible = !this.addHotelModalVisible;
    this.addVerif = 1;
  }

  toggleEditHotelModal(hotel: Hotel) {
    this.editHotelModalVisible = !this.editHotelModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(hotel.id, [Validators.required]),
      editHotelName: new FormControl(hotel.nomHotel, [Validators.required]),
      editHotelAddress: new FormControl(hotel.adress, [Validators.required]),
      editHotelStarRating: new FormControl(hotel.nbEtoile, [
        Validators.required,
      ]),
      editHotelCity: new FormControl(hotel.ville, [Validators.required]),
      editHotelVisitorCount: new FormControl(hotel.nbVisiteur, [
        Validators.required,
      ]),
    });
  }
}
