import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compte } from 'src/Modeles/Compte';

import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-compte-admin',
  templateUrl: './compte-admin.component.html',
  styleUrls: ['./compte-admin.component.css'],
})
export class CompteAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  comptes: Compte[] = [];
  newCompte: Compte = {
    id: 0,
    Email: '',
    Password: '',
    administrator_id: null,
    client_id: null,
  };
  editedCompte: Compte = {
    id: 0,
    Email: '',
    Password: '',
    administrator_id: null,
    client_id: null,
  };
  addCompteModalVisible: boolean = false;
  editCompteModalVisible: boolean = false;

  constructor(private api: ApiService) {}

  refreshData() {
    this.api.getData('comptes').subscribe((data: Compte[]) => {
      this.comptes = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addCompte() {
    this.api.postData('comptes', this.newCompte).subscribe(() => {
      this.comptes.push(this.newCompte);
      this.newCompte = {
        id: 0,
        Email: '',
        Password: '',
        administrator_id: null,
        client_id: null,
      };
      this.addVerif = 0;
    });
  }

  editCompte() {
    const formValues = this.formEdit.getRawValue();
    this.editedCompte.id = formValues.id;
    this.editedCompte.Email = formValues.editCompteEmail;
    this.editedCompte.Password = formValues.editComptePassword;
    this.editedCompte.administrator_id = formValues.editCompteAdministratorId;
    this.editedCompte.client_id = formValues.editCompteClientId;

    const index = this.comptes.findIndex(
      (compte) => compte.id === this.editedCompte.id
    );
    if (index !== -1) {
      this.comptes[index] = { ...this.editedCompte };
    }

    this.api
      .putData('comptes', this.editedCompte.id.toString(), this.editedCompte)
      .subscribe(() => {});
    this.addVerif = 0;
  }

  deleteCompte(index: number) {
    this.comptes = this.comptes.filter((item) => item.id != index);
    this.api.deleteData('comptes', index.toString()).subscribe(() => {});
  }

  toggleAddCompteModal() {
    this.addCompteModalVisible = !this.addCompteModalVisible;
    this.addVerif = 1;
  }

  toggleEditCompteModal(compte: Compte) {
    this.editCompteModalVisible = !this.editCompteModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(compte.id, [Validators.required]),
      editCompteEmail: new FormControl(compte.Email, [
        Validators.required,
        Validators.email,
      ]),
      editComptePassword: new FormControl(compte.Password, [
        Validators.required,
      ]),
      editCompteAdministratorId: new FormControl(compte.administrator_id),
      editCompteClientId: new FormControl(compte.client_id),
    });
  }
}
