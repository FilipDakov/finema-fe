import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/security/auth.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-show-reservations-user',
  templateUrl: './show-reservations-user.component.html',
  styleUrls: ['./show-reservations-user.component.css']
})
export class ShowReservationsUserComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'seat', 'movie', 'startTime', 'hall', 'date', 'status'];
  public reservations: Array<Reservation> = [];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  constructor(private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string,
    private authenticationService: AuthenticationService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    this.dataSource.paginator = this.paginator;
    this.http.get<any>(this.backendUrl.concat("/reservation/getReservations/" + this.authenticationService.currentUserValue.email), { 'headers': headers }).subscribe(el => {
     
      this.reservations = el;
      console.log(this.reservations);
      this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
      this.dataSource.paginator = this.paginator;
    });
  }

}
