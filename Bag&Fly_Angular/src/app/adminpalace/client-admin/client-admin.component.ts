import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Clients';

import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.css'],
})
export class ClientAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  clients: Client[] = [];
  newClient: Client = {
    id: 0,
    nomClient: '',
    cin: '',
    numTel: '',
  };
  editedClient: Client = {
    id: 0,
    nomClient: '',
    cin: '',
    numTel: '',
  };
  addClientModalVisible: boolean = false;
  editClientModalVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}
  refreshData() {
    this.api.getData('clients').subscribe((data: Client[]) => {
      this.clients = data;
    });
  }
  ngOnInit(): void {
    this.refreshData();
  }

  addClient() {
    this.api.postData('clients', this.newClient).subscribe(() => {
      this.clients.push(this.newClient);
      this.newClient = {
        id: 0,
        nomClient: '',
        cin: '',
        numTel: '',
      };
      this.addVerif = 0;
    });
  }

  editClient() {
    const formValues = this.formEdit.getRawValue();
    console.log(this.editClient);
    this.editedClient.id = formValues.id;
    this.editedClient.nomClient = formValues.editClientName;
    this.editedClient.cin = formValues.editClientCin;
    this.editedClient.numTel = formValues.editClientNumTel;

    const index = this.clients.findIndex(
      (client) => client.id === this.editedClient.id
    );
    if (index !== -1) {
      this.clients[index] = { ...this.editedClient };
    }

    this.api
      .putData('clients', this.editedClient.id.toString(), this.editedClient)
      .subscribe(() => {});
    this.addVerif = 0;
  }

  deleteClient(index: number) {
    this.clients = this.clients.filter((item) => item.id != index);
    this.api.deleteData('clients', index.toString()).subscribe(() => {});
  }

  toggleAddClientModal() {
    this.addClientModalVisible = !this.addClientModalVisible;
    this.addVerif = 1;
  }

  toggleEditClientModal(client: Client) {
    this.editClientModalVisible = !this.editClientModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(client.id, [Validators.required]),
      editClientName: new FormControl(client.nomClient, [Validators.required]),
      editClientCin: new FormControl(client.cin, [Validators.required]),
      editClientNumTel: new FormControl(client.numTel, [Validators.required]),
    });
  }
}
