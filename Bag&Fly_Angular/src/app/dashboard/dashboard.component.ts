import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Hotel } from 'src/Modeles/Hotel';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router, private api: ApiService) {}
  destination: string | undefined;
  selectedPerson: number | undefined;
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  hotel_count = '';
  hotels: Hotel[] = [];

  async ngOnInit(): Promise<void> {
    this.api.getData('hotels').subscribe((data) => {
      this.hotels = data;
      console.log(this.hotels);
    });
  }

  searchHotel() {
    const serializedHotels = JSON.stringify(this.hotels);
    this.router.navigate(['/hotellist'], {
      queryParams: {
        destination: this.destination,
        selectedPerson: this.selectedPerson,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        ['hotels']: serializedHotels,
      },
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
