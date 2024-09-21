import { Component } from '@angular/core';
import { ApiService } from 'src/Services/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/Modeles/Reservation';

@Component({
  selector: 'app-reservation-admin',
  templateUrl: './reservation-admin.component.html',
  styleUrls: ['./reservation-admin.component.css']
})
export class ReservationAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  reservations: Reservation[] = [];
  newReservation: Reservation = {
    id: 0,
    checkin: '',
    checkout: '',
    PrixTotal: 0,
    nbPerson: 0,
    client_id: null,
    hotel_id: null,
    etat: '',
  };
  editedReservation: Reservation = {
    id: 0,
    checkin: '',
    checkout: '',
    PrixTotal: 0,
    nbPerson: 0,
    client_id: null,
    hotel_id: null,
    etat: '',
  };
  addReservationModalVisible: boolean = false;
  editReservationModalVisible: boolean = false;

  constructor(private api: ApiService) {}

  refreshData() {
    this.api.getData('reservations').subscribe((data: Reservation[]) => {
      this.reservations = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addReservation() {
    this.api.postData('reservations', this.newReservation).subscribe(() => {
      this.reservations.push(this.newReservation);
      this.newReservation = {
        id: 0,
        checkin: '',
        checkout: '',
        PrixTotal: 0,
        nbPerson: 0,
        client_id: null,
        hotel_id: null,
        etat: '',
      };
      this.addVerif = 0;
    });
  }

  editReservation() {
    const formValues = this.formEdit.getRawValue();
    this.editedReservation.id = formValues.id;
    this.editedReservation.checkin = formValues.editReservationCheckin;
    this.editedReservation.checkout = formValues.editReservationCheckout;
    this.editedReservation.PrixTotal = formValues.editReservationPrixTotal;
    this.editedReservation.nbPerson = formValues.editReservationNbPerson;
    this.editedReservation.client_id = formValues.editReservationClientId;
    this.editedReservation.hotel_id = formValues.editReservationHotelId;
    this.editedReservation.etat = formValues.editReservationEtat;

    const index = this.reservations.findIndex((reservation) => reservation.id === this.editedReservation.id);
    if (index !== -1) {
      this.reservations[index] = { ...this.editedReservation };
    }

    this.api.putData('reservations', this.editedReservation.id.toString(), this.editedReservation).subscribe(() => {});
    this.addVerif = 0;
  }

  deleteReservation(index: number) {
    this.reservations = this.reservations.filter((item) => item.id != index);
    this.api.deleteData('reservations', index.toString()).subscribe(() => {});
  }

  toggleAddReservationModal() {
    this.addReservationModalVisible = !this.addReservationModalVisible;
    this.addVerif = 1;
  }

  toggleEditReservationModal(reservation: Reservation) {
    this.editReservationModalVisible = !this.editReservationModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(reservation.id, [Validators.required]),
      editReservationCheckin: new FormControl(reservation.checkin, [Validators.required]),
      editReservationCheckout: new FormControl(reservation.checkout, [Validators.required]),
      editReservationPrixTotal: new FormControl(reservation.PrixTotal, [Validators.required]),
      editReservationNbPerson: new FormControl(reservation.nbPerson, [Validators.required]),
      editReservationClientId: new FormControl(reservation.client_id, [Validators.required]),
      editReservationHotelId: new FormControl(reservation.hotel_id, [Validators.required]),
      editReservationEtat: new FormControl(reservation.etat, [Validators.required]),
    });
  }
}
