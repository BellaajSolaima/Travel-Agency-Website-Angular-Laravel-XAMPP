import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationpageComponent } from './reservationpage/reservationpage.component';
import { HotellistComponent } from './hotellist/hotellist.component';
import { AdminpalaceComponent } from './adminpalace/adminpalace.component';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'hotelbook',
    pathMatch: 'full',
    component: ReservationpageComponent,
  },
  {
    path: 'hotellist',
    pathMatch: 'full',
    component: HotellistComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminpalaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
