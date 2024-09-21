import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FirebaseModule } from './Firebase.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { ReservationpageComponent } from './reservationpage/reservationpage.component';
import { HotellistComponent } from './hotellist/hotellist.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminpalaceComponent } from './adminpalace/adminpalace.component';
import { HotelAdminComponent } from './adminpalace/hotel-admin/hotel-admin.component';
import { ClientAdminComponent } from './adminpalace/client-admin/client-admin.component';
import { CompteAdminComponent } from './adminpalace/compte-admin/compte-admin.component';
import { DisponibiliteAdminComponent } from './adminpalace/disponibilite-admin/disponibilite-admin.component';
import { PhotoAdminComponent } from './adminpalace/photo-admin/photo-admin.component';
import { PromotionAdminComponent } from './adminpalace/promotion-admin/promotion-admin.component';
import { ReservationAdminComponent } from './adminpalace/reservation-admin/reservation-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    CustomSnackbarComponent,
    ReservationpageComponent,
    HotellistComponent,
    AdminpalaceComponent,
    HotelAdminComponent,
    ClientAdminComponent,
    CompteAdminComponent,
    DisponibiliteAdminComponent,
    PhotoAdminComponent,
    PromotionAdminComponent,
    ReservationAdminComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    FirebaseModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
