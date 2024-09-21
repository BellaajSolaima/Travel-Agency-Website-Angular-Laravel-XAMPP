import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Disponibilite } from 'src/Modeles/Disponibilite';
import { Hotel } from 'src/Modeles/Hotel';
import { Photo } from 'src/Modeles/Photo';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-hotellist',
  templateUrl: './hotellist.component.html',
  styleUrls: ['./hotellist.component.css'],
})
export class HotellistComponent {
  availableHotels: Hotel[] = [];
  availableHotelsCopy: Hotel[] = [];
  hotels: Hotel[] = [];
  disponibilites: Disponibilite[] = [];
  photos: Photo[] = [];
  destination: String = '';
  selectedPerson: String = '';
  checkInDate: String = '';
  checkOutDate: String = '';
  length = 50;
  pageSize = 4;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = new PageEvent();
  lowValue: number = 0;
  highValue: number = this.pageSize;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.api.getData('photos').subscribe((data: Photo[]) => {
      this.photos = data;
    });
    this.route.queryParams.subscribe(async (params) => {
      const destination = params['destination'];
      const selectedPerson = params['selectedPerson'];
      const checkInDate = params['checkInDate'];
      const checkOutDate = params['checkOutDate'];

      this.destination = destination;
      this.selectedPerson = selectedPerson;
      this.checkInDate = checkInDate;
      this.checkOutDate = checkOutDate;

      const [hotelsData, disponibilitesData] = await Promise.all([
        this.api.getData('hotels').toPromise(),
        this.api.getData('disponibilites').toPromise(),
      ]);
      this.hotels = hotelsData;
      this.disponibilites = disponibilitesData;

      console.log(this.hotels);
      console.log(this.disponibilites);

      this.hotels.forEach((hotel) => {
        this.disponibilites.forEach((dispo) => {
          if (
            dispo.hotel_id == hotel.id &&
            new Date(dispo.dateDebut) <= new Date(checkInDate) &&
            new Date(dispo.dateFin) >= new Date(checkOutDate) &&
            (dispo.nbChambreRestantes2 > 0 ||
              dispo.nbChambreRestantes3 > 0 ||
              dispo.nbChambreRestantes4 > 0)
          ) {
            if (!this.availableHotels.some((h) => h.id === hotel.id)) {
              this.availableHotels.push(hotel);
            }
          }
        });
      });
      this.availableHotelsCopy = this.availableHotels.slice(
        this.lowValue,
        this.highValue
      );
      console.log(this.availableHotelsCopy);
    });
  }

  startValue = 200;
  endValue = 500;
  minValue = 0;
  maxValue = 700;
  isChecked: boolean = false;
  allComplete: boolean = false;
  promotionChecked = false;
  task: any = {
    name: 'Villes',
    completed: true,
    color: 'accent',
    subtasks: [
      { name: 'Sfax', completed: true },
      { name: 'Tunis', completed: true },
      { name: 'Sousse', completed: true },
      { name: 'Bizerte', completed: true },
      { name: 'Kairouan', completed: true },
      { name: 'Gabès', completed: true },
      { name: 'Gafsa', completed: true },
      { name: 'Nabeul', completed: true },
      { name: 'Ariana', completed: true },
      { name: 'Monastir', completed: true },
      { name: 'Ben Arous', completed: true },
      { name: 'Mahdia', completed: true },
      { name: 'Kasserine', completed: true },
      { name: 'Medenine', completed: true },
      { name: 'Tataouine', completed: true },
      { name: 'Siliana', completed: true },
      { name: 'Zaghouan', completed: true },
      { name: 'Kef', completed: true },
      { name: 'Tozeur', completed: true },
      { name: 'Jendouba', completed: true },
      { name: 'Kebili', completed: true },
      { name: 'Beja', completed: true },
      { name: 'Manouba', completed: true },
      { name: 'Gouvernorat de Tunis', completed: true },
    ],
  };

  goToReservPage(hotel: Hotel) {
    const serializedHotel = JSON.stringify(hotel);
    const serializedphotos = JSON.stringify(
      this.photos.find((photo) => photo.hotel_id == hotel.id)
    );
    this.router.navigate(['/hotelbook'], {
      queryParams: {
        ['photo']: serializedphotos,
        ['hotelaReserver']: serializedHotel,
        destination: this.destination,
        selectedPerson: this.selectedPerson,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
      },
    });
  }

  handlePageEvent(e: PageEvent): PageEvent {
    this.lowValue = e.pageIndex * e.pageSize;
    this.highValue = this.lowValue + e.pageSize;

    this.availableHotelsCopy = this.availableHotels.slice(
      this.lowValue,
      this.highValue
    );
    console.log(this.availableHotelsCopy);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    return e;
  }

  gethotelphoto(id: number): string {
    const photo = this.photos.find(
      (item) => item.hotel_id.toString() == id.toString()
    );

    return photo ? photo.photo1 : '';
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t: { completed: any }) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t: { completed: any }) => t.completed).length >
        0 && !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(
      (t: { completed: boolean }) => (t.completed = completed)
    );
  }
}
