import { Component } from '@angular/core';
import { ApiService } from 'src/Services/api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Promotion } from 'src/Modeles/Promotion';

@Component({
  selector: 'app-promotion-admin',
  templateUrl: './promotion-admin.component.html',
  styleUrls: ['./promotion-admin.component.css']
})
export class PromotionAdminComponent {
  formEdit!: FormGroup;
  addVerif: number = 0;
  promotions: Promotion[] = [];
  newPromotion: Promotion = {
    id: 0,
    dateDebut: '',
    dateFin: '',
    pourcentage: 0,
    hotel_id: null,
  };
  editedPromotion: Promotion = {
    id: 0,
    dateDebut: '',
    dateFin: '',
    pourcentage: 0,
    hotel_id: null,
  };
  addPromotionModalVisible: boolean = false;
  editPromotionModalVisible: boolean = false;

  constructor(private api: ApiService) {}

  refreshData() {
    this.api.getData('promotions').subscribe((data: Promotion[]) => {
      this.promotions = data;
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  addPromotion() {
    this.api.postData('promotions', this.newPromotion).subscribe(() => {
      this.promotions.push(this.newPromotion);
      this.newPromotion = {
        id: 0,
        dateDebut: '',
        dateFin: '',
        pourcentage: 0,
        hotel_id: null,
      };
      this.addVerif = 0;
    });
  }

  editPromotion() {
    const formValues = this.formEdit.getRawValue();
    this.editedPromotion.id = formValues.id;
    this.editedPromotion.dateDebut = formValues.editPromotionStartDate;
    this.editedPromotion.dateFin = formValues.editPromotionEndDate;
    this.editedPromotion.pourcentage = formValues.editPromotionPourcentage;
    this.editedPromotion.hotel_id = formValues.editPromotionHotelId;

    const index = this.promotions.findIndex((promotion) => promotion.id === this.editedPromotion.id);
    if (index !== -1) {
      this.promotions[index] = { ...this.editedPromotion };
    }

    this.api.putData('promotions', this.editedPromotion.id.toString(), this.editedPromotion).subscribe(() => {});
    this.addVerif = 0;
  }

  deletePromotion(index: number) {
    this.promotions = this.promotions.filter((item) => item.id != index);
    this.api.deleteData('promotions', index.toString()).subscribe(() => {});
  }

  toggleAddPromotionModal() {
    this.addPromotionModalVisible = !this.addPromotionModalVisible;
    this.addVerif = 1;
  }

  toggleEditPromotionModal(promotion: Promotion) {
    this.editPromotionModalVisible = !this.editPromotionModalVisible;
    this.addVerif = 2;
    this.formEdit = new FormGroup({
      id: new FormControl(promotion.id, [Validators.required]),
      editPromotionStartDate: new FormControl(promotion.dateDebut, [Validators.required]),
      editPromotionEndDate: new FormControl(promotion.dateFin, [Validators.required]),
      editPromotionPourcentage: new FormControl(promotion.pourcentage, [Validators.required]),
      editPromotionHotelId: new FormControl(promotion.hotel_id, [Validators.required]),
    });
  }
}
