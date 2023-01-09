import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/security/auth.service';
import { User } from 'src/security/user';
import { ModalElementComponent } from '../modal-element/modal-element.component';
import { Movie } from '../models/movie';
import { PremiereType } from '../models/premiereType';
import { Screening } from '../models/screening';
import { ScreeningType } from '../models/screeningType';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css']
})
export class AddScreeningComponent implements OnInit {

  public movieName: string = '';
  public movies: Array<string>;
  public halls: Array<number>;
  public hall: number;
  public premiereTypes: Array<String> = [];
  public premiereType: string = '';
  public premiereMap = new Map<string, any>();

  public screeningTypes: Array<String> = [];
  public screeningType: string = '';
  public screeningMap = new Map<string, any>();
  public ticketPrices = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  public ticketPrice = 5;

  public time = { hour: 13, minute: 30 };

  model: NgbDateStruct;
  private bearer = new HttpHeaders();//.set('Authorization',`Bearer ${this.user.token}`)
  private user: User = JSON.parse(localStorage.getItem('user'));


  constructor(private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string, 
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.bearer.append("Authorization", "Bearer " + this.user.token);
    this.bearer = this.bearer.append("Content-type","application/json");
    this.bearer = this.bearer.append("Accept","application/json");
    this.bearer = this.bearer.append("charset","utf-8")
    this.http.get(this.backendUrl.concat("/movies/getCurrentMovies"), { 'headers': this.bearer })
      .subscribe(data => {
        console.log(data);
        let movies = data as Movie[];
        this.movies = [];
        movies.forEach(x => {
          this.movies.push(x.name);
        })
      });


    this.http.get(this.backendUrl.concat("/hall/getHalls"), { 'headers': this.bearer })
      .subscribe(data => {
        console.log(data);
        this.halls = data as number[];

      });

    Object.entries(PremiereType).forEach(([key, value]) => {
      this.premiereTypes.push(value);
      this.premiereMap.set(value, key);
    });

    Object.entries(ScreeningType).forEach(([key, value]) => {
      this.screeningTypes.push(value);
      this.screeningMap.set(value, key);
    });

  }

  disableButton() {
    if (this.movieName != '' && this.hall != null && this.premiereType != null && this.screeningType != null && this.model != null && (this.time.hour < 23 && this.time.hour >= 10)) {
      return false;
    }
    
    return true;
  }

  submitButton() {
    let date = new Date;
    //debugger;
    date.setDate(this.model.day);
    date.setMonth(this.model.month - 1);
    date.setFullYear(this.model.year);
    let startTime = (this.time.hour > 9 ? ""+ this.time.hour : "0" + this.time.hour) + ":" + this.time.minute;
    let screening = new Screening(date, this.hall, null, this.movieName,
        this.premiereMap.get(this.premiereType), this.screeningMap.get(this.screeningType), startTime, this.ticketPrice);
    let body = JSON.stringify(screening);
    const headers = { 'Content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
    
    console.log(body);
    console.log(this.bearer);
    this.http.post<any>(this.backendUrl.concat("/screening/addScreening"),body ,{ 'headers': this.bearer})
      .subscribe(data => {
        console.log(data);
        const modalRef = this.modalService.open(ModalElementComponent);
    //    console.log(el.message);
        modalRef.componentInstance.name = data.message;
      });
  }

  isDisabled = (date: NgbDateStruct) => {
    let now = new Date;
    if (date.year < now.getFullYear()) {
      return true;
    } else if (date.month < now.getMonth() + 1) {
      return true;
    } else if (date.month == now.getMonth() + 1 && date.day < now.getDate()) {
      return true;
    }
    return false;
  }


  changeFn() {
    console.log(this.movies);
  }

  changeFn1() {
    console.log(this.premiereType);
  }
}
