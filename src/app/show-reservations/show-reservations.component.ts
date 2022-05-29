import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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
export class ShowReservationsComponent implements AfterViewInit   {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'user','seat','movie','startTime','hall','date','button','button2'];
  public reservations : Array<Reservation> = [];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);
  public firstName : string = '';
  public middleName : string = '';
  public lastName : string = '';

  constructor(private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string,
    private modalService: NgbModal){}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  submit(){
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' }; 
    let reservation = new Person(this.firstName,this.middleName,this.lastName);
     console.log(reservation);
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/getReservations"), body, { 'headers': headers }).subscribe(el => {
      this.reservations = el;
      this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
      this.dataSource.paginator = this.paginator;
    });
  }


  approveReservation(reservation : Reservation){
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' }; 
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/confirm"), body, { 'headers': headers }).subscribe(el => {
      console.log(el);
      const modalRef = this.modalService.open(ModalElementComponent);
    //    console.log(el.message);
        modalRef.componentInstance.name = el.message;
    });
  }

  deleteReservation(reservation : Reservation){
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' }; 
    let body = JSON.stringify(reservation);
    this.http.post<any>(this.backendUrl.concat("/reservation/delete"), body, { 'headers': headers }).subscribe(el => {
      console.log(el);
      const modalRef = this.modalService.open(ModalElementComponent);
    //    console.log(el.message);
        modalRef.componentInstance.name = el.message;
    });
  }
}
