import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalElementComponent } from '../modal-element/modal-element.component';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { Movie } from '../models/movie';
import { Resctriction } from '../models/restrictionEnum';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public movieName: string = '';
  public timespan: number = 0;
  public description: string = "";
  public selectedGenres: Array<string> = [];
  public genre: any;
  public restriction: any;
  public actors: Array<Actor> = [];

  public resctrictions: Array<string> = [];
  public genres: Array<string> = [];
  public actor: string = '';

  selectedFiles?: FileList;
  currentFile?: File;



  public mapGenres = new Map<string, any>();
  public mapRestrictions = new Map<string, any>();

  public today: string = "2022-05-15";

  model: NgbDateStruct;
  date: { year: number, month: number };


  constructor(private calendar: NgbCalendar, private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl: string,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    Object.entries(Genre).forEach(([key, value]) => {
      this.genres.push(value);
      this.mapGenres.set(value, key);
    });

    Object.entries(Resctriction).forEach(([key, value]) => {
      this.resctrictions.push(value);
      this.mapRestrictions.set(value, key);
    });

    console.log(this.mapRestrictions);

  }

  testClick() {

    let date = new Date;
    //debugger;
    date.setDate(this.model.day);
    date.setMonth(this.model.month - 1);
    date.setFullYear(this.model.year);

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        this.upload(this.currentFile).subscribe((event: any) => {

          if (event.type === HttpEventType.UploadProgress) {
            console.log(Math.round(100 * event.loaded / event.total));

          } else if (event instanceof HttpResponse) {
            if (event.body.errorCode == 200) {
              let genresEnum = [];
              this.selectedGenres.forEach(x =>
                genresEnum.push(this.mapGenres.get(x)));
              let newMovie = new Movie(this.actors, this.mapRestrictions.get(this.restriction), this.description, genresEnum, "/assets/img/" + this.currentFile.name, this.movieName, date, this.timespan);
              console.log(newMovie);
              const headers = { 'content-type': 'application/json', 'Accept': 'application/json', 'charset': 'utf-8' };
              const body = JSON.stringify(newMovie);
              //  const modalRef = this.modalService.open(ModalElementComponent);
              this.http.post<any>(this.backendUrl.concat("/movies/addMovie"), body, { 'headers': headers }).subscribe(el => {
                console.log(el);
                const modalRef = this.modalService.open(ModalElementComponent);
                // console.log(el.message);
                modalRef.componentInstance.name = el.message;
              });
            }else{
              const modalRef = this.modalService.open(ModalElementComponent);
              // console.log(el.message);
              modalRef.componentInstance.name = "Проблем със записването на файла. Опитайте отново.";
            }
          }
        });
      }
    }

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
    console.log(this.restriction);
  }

  btnClick() {
    const modalRef = this.modalService.open(ModalElementComponent);
    if (this.actor == '') {
      modalRef.componentInstance.name = "Въведете две имена на актьора";
      //   alert("Въведете две имена на актьора");
    } else {
      let names = this.actor.split(' ');
      if (names.length != 2) {
        modalRef.componentInstance.name = "Въведете две имена на актьора";
        //       alert("Въведете само две имена на актьора");
      } else {
        this.actors.push(new Actor(names[0], names[1]));
        modalRef.componentInstance.name = "Добавен е актьор : " + names[0] + " " + names[1];
        //      alert("Добавен е актьор : " + names[0] + " " + names[1]);
      }
    }

    console.log(this.actors);
  }

  removeClick() {
    const modalRef = this.modalService.open(ModalElementComponent);
    if (this.actors.length > 0) {
      let actor: Actor = this.actors.pop();
      modalRef.componentInstance.name = "Премахнат е актьор : " + actor.firstName + " " + actor.lastName;
      //   alert("Премахнат е актьор : " + actor.firstName + " " + actor.lastName);
    }
  }

  addGenreClick() {
    const modalRef = this.modalService.open(ModalElementComponent);
    if (this.genre != null) {
      if (this.selectedGenres.includes(this.genre)) {
        modalRef.componentInstance.name = "Желаният жанр е вече избран";
        //      alert("Желаният жанр е вече избран");
      } else {
        this.selectedGenres.push(this.genre);
        //this.modalService.open(ModalElementComponent);
        modalRef.componentInstance.name = "Жанр " + this.genre + " е добавен";
        //    alert("Жанр " + this.genre+ " е добавен");
      }
    }
  }

  removeGenreClick() {
    const modalRef = this.modalService.open(ModalElementComponent);
    if (this.selectedGenres.length > 0) {
      let genre = this.selectedGenres.pop();
      modalRef.componentInstance.name = "Премахнат е жанр : " + genre;
      //     alert("Премахнат е жанр : " + genre);
    }
  }

  disableButton() {
    if (this.movieName != '' && this.restriction != null
      && this.timespan != null && !isNaN(this.timespan)
      && this.actors.length > 0 && this.selectedGenres.length > 0 && this.description != '' && this.model != null && this.selectedFiles.length>0) {
      return false;
    }
    return true;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.backendUrl.concat("/addFile"), formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  // uploadFile(): string {

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;

  //       this.upload(this.currentFile).subscribe((data: any) => {
  //         return data.message;
  //       });
  //     }
  //   }

  //   return null;
  // }

}
