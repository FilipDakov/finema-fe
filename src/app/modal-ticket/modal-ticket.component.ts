import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Screening } from '../models/screening';
import { Seat } from '../models/seat';
import { ReservationService } from '../service/reservationService';

@Component({
  selector: 'app-modal-ticket',
  templateUrl: './modal-ticket.component.html',
  styleUrls: ['./modal-ticket.component.css']
})
export class ModalTicketComponent implements OnInit {

  @Input() movieName='';
  @Input() day='';
  @Input() time='';
  @Input() date :Date;
  @Input() screening : Screening;
  constructor(private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private router: Router,
    public reservationService: ReservationService,
    private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string) {}

  ngOnInit(): void {
    
  }

  submit(){
    this.reservationService.setScreening(this.screening);
    this.router.navigate(['/reservation']);
    this.activeModal.close();
  }
}
