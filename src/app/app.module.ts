import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { GroupMoviesComponent } from './group-movies/group-movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalElementComponent } from './modal-element/modal-element.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from 'src/security/jwtInterceptor';
import { AddScreeningComponent } from './add-screening/add-screening.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ModalTicketComponent } from './modal-ticket/modal-ticket.component';
import { ReservationService } from './service/reservationService';
import { ModalReservationConfirmComponent } from './modal-reservation-confirm/modal-reservation-confirm.component';
import { ShowReservationsComponent } from './show-reservations/show-reservations.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ShowReservationsUserComponent } from './show-reservations-user/show-reservations-user.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HeaderSectionComponent,
    GroupMoviesComponent,
    MovieItemComponent,
    AddMovieComponent,
    ModalElementComponent,
    LoginComponent,
    RegisterComponent,
    AddScreeningComponent,
    ComingSoonComponent,
    ScheduleComponent,
    ScheduleItemComponent,
    ReservationComponent,
    ModalTicketComponent,
    ModalReservationConfirmComponent,
    ShowReservationsComponent,
    ShowReservationsUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
    
  ],
  providers: [{ provide: 'BACKEND_URL', useValue: 'http://localhost:8080'},
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
