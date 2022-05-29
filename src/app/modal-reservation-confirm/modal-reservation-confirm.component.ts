import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/security/auth.service';
import { ModalElementComponent } from '../modal-element/modal-element.component';
import { Reservation } from '../models/reservation';
import { Screening } from '../models/screening';
import { Seat } from '../models/seat';
import { ReservationService } from '../service/reservationService';

@Component({
  selector: 'app-modal-reservation-confirm',
  templateUrl: './modal-reservation-confirm.component.html',
  styleUrls: ['./modal-reservation-confirm.component.css']
})
export class ModalReservationConfirmComponent implements OnInit {

  public screening: Screening;
  public seats: Array<number>;


  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    public reservationService: ReservationService,
    public authenticationService: AuthenticationService,
    private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string) { }

  ngOnInit(): void {
    this.screening = this.reservationService.getScreening();
    this.seats = this.reservationService.getSelectedSeats();
  }


  submit() {
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    let reservation = new Reservation(this.reservationService.getScreening(), this.reservationService.getFirstName(),
      this.reservationService.getSecondName(), this.reservationService.getLastName(),
      this.reservationService.getSelectedSeats(), this.authenticationService.currentUserValue.email,null);
    console.log(reservation);
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/create"), body, { 'headers': headers }).subscribe(el => {
      console.log(el);
      if (el.errorCode == 200) {
        const modalRef = this.modalService.open(ModalElementComponent)
        modalRef.componentInstance.name = el.message;
        this.router.navigate(['/schedule']);
        this.activeModal.close();
      }else {
        const modalRef = this.modalService.open(ModalElementComponent)
        modalRef.componentInstance.name = el.message;
      }
    });
  }
}
