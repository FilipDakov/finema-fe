import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalElementComponent } from '../modal-element/modal-element.component';
import { Person } from '../models/person';
import { PremiereType } from '../models/premiereType';
import { Reservation } from '../models/reservation';
import { Screening } from '../models/screening';
import { ScreeningType } from '../models/screeningType';


@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.css']
})
export class ShowReservationsComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'user', 'seat', 'movie', 'startTime', 'hall', 'date', 'button', 'button2'];
  public reservations: Array<Reservation> = [];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);
  public firstName: string = '';
  public middleName: string = '';
  public lastName: string = '';
  isCustomSearch : boolean = true;

  constructor(private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string,
    private modalService: NgbModal) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  submit() {
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    let url = "/reservation/getReservations?";
    if (this.firstName != '') {
      url = url.concat("firstName=").concat(this.firstName).concat("&");
    }
    if (this.middleName != '') {
      url = url.concat("middleName=").concat(this.middleName).concat("&");
    }
    if (this.lastName != '') {
      url = url.concat("lastName=").concat(this.lastName).concat("&");
    }

    url = url.substring(0, url.length - 1);

    // let reservation = new Person(this.firstName,this.middleName,this.lastName); 
    // let body = JSON.stringify(reservation);
    // this.http.post<any>(this.backendUrl.concat("/reservation/getReservations"), body, { 'headers': headers }).subscribe(el => {
    //   this.reservations = el;
    //   this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
    //   this.dataSource.paginator = this.paginator;
    // });

    this.http.get<any>(this.backendUrl.concat(url)).subscribe(el => {
      this.reservations = el;
      this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
      this.dataSource.paginator = this.paginator;
      this.isCustomSearch = true;
    });

  }


  approveReservation(reservation: Reservation) {
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/confirm"), body, { 'headers': headers }).subscribe(el => {
      console.log(el);
      const modalRef = this.modalService.open(ModalElementComponent);
      //    console.log(el.message);
      modalRef.componentInstance.name = el.message;
      if(this.isCustomSearch){
        this.submit();
      }else {
        this.getAll();
      }
    });
  }

  deleteReservation(reservation: Reservation) {
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/delete"), body, { 'headers': headers }).subscribe(el => {
      console.log(el);
      const modalRef = this.modalService.open(ModalElementComponent);
      //    console.log(el.message);
      modalRef.componentInstance.name = el.message;
      if(this.isCustomSearch){
        this.submit();
      }else {
        this.getAll();
      }
    });
  }


  getAll() {
    this.http.get<any>(this.backendUrl.concat("/reservation/getAllReservations")).subscribe(el => {
      this.reservations = el;
      this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
      this.dataSource.paginator = this.paginator;
      this.isCustomSearch = false;
    });
  }
}
