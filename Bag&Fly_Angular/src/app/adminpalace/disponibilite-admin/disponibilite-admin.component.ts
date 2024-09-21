import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/Services/api-service.service';
import { Disponibilite } from 'src/Modeles/Disponibilite';

@Component({
  selector: 'app-disponibilite-admin',
  templateUrl: './disponibilite-admin.component.html',
  styleUrls: ['./disponibilite-admin.component.css'],
})
export class DisponibiliteAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  disponibilites: Disponibilite[] = [];
  newDisponibilite: Disponibilite = {
    id: 0,
    dateDebut: '',
    dateFin: '',
    nbChambre2: 0,
    nbChambreRestantes2: 0,
    prixChambre2: 0,
    nbChambre3: 0,
    nbChambreRestantes3: 0,
    prixChambre3: 0,
    nbChambre4: 0,
    nbChambreRestantes4: 0,
    prixChambre4: 0,
    hotel_id: null,
  };
  editedDisponibilite: Disponibilite = {
    id: 0,
    dateDebut: '',
    dateFin: '',
    nbChambre2: 0,
    nbChambreRestantes2: 0,
    prixChambre2: 0,
    nbChambre3: 0,
    nbChambreRestantes3: 0,
    prixChambre3: 0,
    nbChambre4: 0,
    nbChambreRestantes4: 0,
    prixChambre4: 0,
    hotel_id: null,
  };
  addDisponibiliteModalVisible: boolean = false;
  editDisponibiliteModalVisible: boolean = false;

  constructor(private api: ApiService) {}

  refreshData() {
    this.api.getData('disponibilites').subscribe((data: Disponibilite[]) => {
      this.disponibilites = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addDisponibilite() {
    this.api.postData('disponibilites', this.newDisponibilite).subscribe(() => {
      this.disponibilites.push(this.newDisponibilite);
      this.newDisponibilite = {
        id: 0,
        dateDebut: '',
        dateFin: '',
        nbChambre2: 0,
        nbChambreRestantes2: 0,
        prixChambre2: 0,
        nbChambre3: 0,
        nbChambreRestantes3: 0,
        prixChambre3: 0,
        nbChambre4: 0,
        nbChambreRestantes4: 0,
        prixChambre4: 0,
        hotel_id: null,
      };
      this.addVerif = 0;
    });
  }

  editDisponibilite() {
    const formValues = this.formEdit.getRawValue();
    this.editedDisponibilite.id = formValues.id;
    this.editedDisponibilite.dateDebut = formValues.editDisponibiliteStartDate;
    this.editedDisponibilite.dateFin = formValues.editDisponibiliteEndDate;
    this.editedDisponibilite.nbChambre2 =
      formValues.editDisponibiliteNbChambre2;
    this.editedDisponibilite.nbChambreRestantes2 =
      formValues.editDisponibiliteNbChambreRestantes2;
    this.editedDisponibilite.prixChambre2 =
      formValues.editDisponibilitePrixChambre2;
    this.editedDisponibilite.nbChambre3 =
      formValues.editDisponibiliteNbChambre3;
    this.editedDisponibilite.nbChambreRestantes3 =
      formValues.editDisponibiliteNbChambreRestantes3;
    this.editedDisponibilite.prixChambre3 =
      formValues.editDisponibilitePrixChambre3;
    this.editedDisponibilite.nbChambre4 =
      formValues.editDisponibiliteNbChambre4;
    this.editedDisponibilite.nbChambreRestantes4 =
      formValues.editDisponibiliteNbChambreRestantes4;
    this.editedDisponibilite.prixChambre4 =
      formValues.editDisponibilitePrixChambre4;
    this.editedDisponibilite.hotel_id = formValues.editDisponibiliteHotelId;

    const index = this.disponibilites.findIndex(
      (disponibilite) => disponibilite.id === this.editedDisponibilite.id
    );
    if (index !== -1) {
      this.disponibilites[index] = { ...this.editedDisponibilite };
    }

    this.api
      .putData(
        'disponibilites',
        this.editedDisponibilite.id.toString(),
        this.editedDisponibilite
      )
      .subscribe(() => {});
    this.addVerif = 0;
  }

  deleteDisponibilite(index: number) {
    this.disponibilites = this.disponibilites.filter(
      (item) => item.id != index
    );
    this.api.deleteData('disponibilites', index.toString()).subscribe(() => {});
  }

  toggleAddDisponibiliteModal() {
    this.addDisponibiliteModalVisible = !this.addDisponibiliteModalVisible;
    this.addVerif = 1;
  }

  toggleEditDisponibiliteModal(disponibilite: Disponibilite) {
    this.editDisponibiliteModalVisible = !this.editDisponibiliteModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(disponibilite.id, [Validators.required]),
      editDisponibiliteStartDate: new FormControl(disponibilite.dateDebut, [
        Validators.required,
      ]),
      editDisponibiliteEndDate: new FormControl(disponibilite.dateFin, [
        Validators.required,
      ]),
      editDisponibiliteNbChambre2: new FormControl(disponibilite.nbChambre2, [
        Validators.required,
      ]),
      editDisponibiliteNbChambreRestantes2: new FormControl(
        disponibilite.nbChambreRestantes2,
        [Validators.required]
      ),
      editDisponibilitePrixChambre2: new FormControl(
        disponibilite.prixChambre2,
        [Validators.required]
      ),
      editDisponibiliteNbChambre3: new FormControl(disponibilite.nbChambre3, [
        Validators.required,
      ]),
      editDisponibiliteNbChambreRestantes3: new FormControl(
        disponibilite.nbChambreRestantes3,
        [Validators.required]
      ),
      editDisponibilitePrixChambre3: new FormControl(
        disponibilite.prixChambre3,
        [Validators.required]
      ),
      editDisponibiliteNbChambre4: new FormControl(disponibilite.nbChambre4, [
        Validators.required,
      ]),
      editDisponibiliteNbChambreRestantes4: new FormControl(
        disponibilite.nbChambreRestantes4,
        [Validators.required]
      ),
      editDisponibilitePrixChambre4: new FormControl(
        disponibilite.prixChambre4,
        [Validators.required]
      ),
      editDisponibiliteHotelId: new FormControl(disponibilite.hotel_id, [
        Validators.required,
      ]),
    });
  }
}
