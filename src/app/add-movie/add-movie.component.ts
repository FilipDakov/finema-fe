import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public phone: string = '';
  public description: string = "";
  public resctrictions: Array<string> = [];
  public genres: Array<string> = [];
  public restriction: any;
  public actor: string = '';
  public actors: Array<Actor> = [];
  public genre: any ;
  public selectedGenres: Array<string> = [];
  public mapGenres = new Map<string, any>(); 
  public mapRestrictions = new Map<string, any>(); 

  public today: string = "2022-05-15";

  model: NgbDateStruct;
  date: { year: number, month: number };


  constructor(private calendar: NgbCalendar,private http: HttpClient,
    @Inject('BACKEND_URL') private backendUrl:string,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.genres = Object.values(Genre).filter((item) => {
    //   return isNaN(Number(item));
    // });
    // this.resctrictions = Object.keys(Resctriction).filter((item) => {
    //   return isNaN(Number(item));
    // });

    // const result = (Object.keys(Genre) as (keyof typeof Genre)[]).map(
    //   (key, index) => {
    //     console.log(key);
    //     return Genre[key] + index;
    //   },
    // );

    // console.log(result);
    

    Object.entries(Genre).forEach(([key, value]) => {
      this.genres.push(value);
      this.mapGenres.set(value,key);
    });

    Object.entries(Resctriction).forEach(([key, value]) => {
      this.resctrictions.push(value);
      this.mapRestrictions.set(value,key);
    });

    console.log(this.mapRestrictions);

  }

  testClick() {
    console.log(this.description);
    console.log(this.movieName);
    console.log(this.description);
    let date = new Date;
    //debugger;
    date.setDate(this.model.day);
    date.setMonth(this.model.month-1);
    date.setFullYear(this.model.year);

    let genresEnum =  [];
    this.selectedGenres.forEach(x =>
      genresEnum.push(this.mapGenres.get(x)));
    let newMovie = new Movie(this.actors,this.mapRestrictions.get(this.restriction),this.description,genresEnum,"assets/img/finemaLogo.png",this.movieName,date,this.timespan);
    console.log(newMovie);
    const headers = { 'content-type': 'application/json','Accept':'application/json','charset':'utf-8'} ;
    const body=JSON.stringify(newMovie);
    let finish = false;
  //  const modalRef = this.modalService.open(ModalElementComponent);
    this.http.post<any>(this.backendUrl.concat("/movies/addMovie"), body,{'headers':headers}).subscribe(el => {
      console.log(el);
      const modalRef = this.modalService.open(ModalElementComponent);
      console.log(el.message);
      modalRef.componentInstance.name =el.message;
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
    console.log(this.restriction);
  }

  btnClick() {
    const modalRef = this.modalService.open(ModalElementComponent);
    if (this.actor == '') {
      modalRef.componentInstance.name ="Въведете две имена на актьора";
   //   alert("Въведете две имена на актьора");
    } else {
      let names = this.actor.split(' ');
      if (names.length > 2) {
        modalRef.componentInstance.name ="Въведете само две имена на актьора";
 //       alert("Въведете само две имена на актьора");
      } else {
        this.actors.push(new Actor(names[0], names[1]));
        modalRef.componentInstance.name ="Добавен е актьор : " + names[0] + " " + names[1];
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

  addGenreClick(){
    const modalRef = this.modalService.open(ModalElementComponent);
    if(this.genre != null ){
      if(this.selectedGenres.includes(this.genre)){
        modalRef.componentInstance.name = "Желаният жанр е вече избран";
  //      alert("Желаният жанр е вече избран");
      }else{
      this.selectedGenres.push(this.genre);
      //this.modalService.open(ModalElementComponent);
      modalRef.componentInstance.name = "Жанр " + this.genre+ " е добавен";
  //    alert("Жанр " + this.genre+ " е добавен");
      }
    }
  }

  removeGenreClick(){
    const modalRef = this.modalService.open(ModalElementComponent);
    if(this.selectedGenres.length > 0){
      let genre = this.selectedGenres.pop();
      modalRef.componentInstance.name = "Премахнат е жанр : " + genre;
 //     alert("Премахнат е жанр : " + genre);
    }
  }

}
