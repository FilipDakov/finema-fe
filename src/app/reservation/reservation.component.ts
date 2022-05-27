import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/security/auth.service';
import { ModalReservationConfirmComponent } from '../modal-reservation-confirm/modal-reservation-confirm.component';
import { Lock } from '../models/lock';
import { Seat } from '../models/seat';
import { ReservationService } from '../service/reservationService';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  public items: Array<any> = ["edno", "dve", "tri"];
  public movieName: string = "";


  public seatView: Seat[][];
  public firstName: string = '';
  public middleName: string = '';
  public lastName: string = '';
  public phone: string = '';
  public seats: number = 0;

  constructor(public reservationService: ReservationService,
    private http: HttpClient, @Inject('BACKEND_URL') private backendUrl: string,
    public authenticationService: AuthenticationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.reservationService.getScreening());

    let count = 0;

    this.seatView = [];

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.reservationService.getScreening());
    let seat: Seat[] = Array();

    this.http.post(this.backendUrl.concat("/reservation/freeSeats"), body, { 'headers': headers })
      .subscribe(x => {
        console.log(x);
        seat = x as Seat[];
        for (let i = 0; i < seat.length / 10; i++) {
          this.seatView[i] = [];
          for (let j = 0; j < 10; j++) {
            if (count < seat.length) {
              this.seatView[i][j] = seat[count++];
            }
          }
        }

      });

  }


  changeFn() {
    console.log(this.movieName);
  }

  isPhoneValid(): boolean {
    let phoneNumberPattern = /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    return phoneNumberPattern.test(this.phone);
  }
  reserveTicket() {
    let selectedSeats = document.getElementsByClassName("selectedSeat");
    this.reservationService.setSelectedSeats([]);
    for(let i = 0 ; i < selectedSeats.length ; i ++){
      this.reservationService.getSelectedSeats().push(  Number(selectedSeats[i].id.match(/\d+/)) );
    }
    console.log(this.reservationService.getSelectedSeats());
    this.reservationService.setFirstName(this.firstName);
    this.reservationService.setLastName(this.lastName);
    this.reservationService.setSecondName(this.middleName);
    const modalRef = this.modalService.open(ModalReservationConfirmComponent);
    //TODO
  }

  seatSelected(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    console.log(target);
    var idAttr = target.attributes.id;
    console.log(idAttr);
    let element = document.getElementById(idAttr.nodeValue);
    console.log(element);
    if (document.getElementsByClassName("selectedSeat").length >= 10 && !element.classList.contains("selectedSeat")) {
      alert("Вече сте избрали максималния брой билети. Моля премахнете избора от жълтите седалки");
    }
    else if (element.classList.contains("selectedSeat")) {
      element.classList.remove("selectedSeat");

      let regex = /\d+/;
      let id = idAttr.nodeValue.match(regex);
      console.log(id);

      const headers = new HttpHeaders().set('content-type', 'application/json');
      //  let dto = {
      //           "destinationCity": this.reservationService.getReservation().destinationCity,
      //           "departureCity": this.reservationService.getReservation().departureCity,
      //           "leavingDate":this.reservationService.getReservation().date,
      //           "seatNumber": id[0],
      //           "userId": 1,
      //           };

      let dto = new Lock(this.reservationService.getScreening(), this.authenticationService.currentUserValue.email, id[0]);
      const body = JSON.stringify(dto);
      this.http.post(this.backendUrl.concat("/locks/unlock"), body, { 'headers': headers })
        .subscribe(el => el);

    }
    else {
      element.classList.add("selectedSeat");
      let regex = /\d+/;

      let id = idAttr.nodeValue.match(regex);
      const headers = new HttpHeaders().set('content-type', 'application/json');
      //  let dto = {
      //           "destinationCity": this.reservationService.getReservation().destinationCity,
      //           "departureCity": this.reservationService.getReservation().departureCity,
      //           "leavingDate":this.reservationService.getReservation().date,
      //           "seatNumber": id[0],
      //           "userId": 1,
      //           };
      let dto = new Lock(this.reservationService.getScreening(), this.authenticationService.currentUserValue.email, id[0]);
      const body = JSON.stringify(dto);
      this.http.post(this.backendUrl.concat("/locks/lock"), body, { 'headers': headers })
        .subscribe(el => el);
      this.seats++;

    }
  }
}
