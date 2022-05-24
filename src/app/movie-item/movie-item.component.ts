import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie : Movie;
  @Input() modalId : number;
  releaseDate : string;
  actors: string;


  constructor() { }

  ngOnInit(): void {
   // console.log(this.movie);
  //  console.log(this.modalId);
    let releaseDate = new Date(this.movie.releaseDate);
    let month =  releaseDate.getMonth() < 10 ? "0" + releaseDate.getMonth() : releaseDate.getMonth();
    this.releaseDate = releaseDate.getDate() + "/" + month  + "/" +  releaseDate.getFullYear();    
    console.log(this.releaseDate);
    this.actors = "";
    this.movie.actors.forEach(actor=> {
      this.actors = this.actors + actor.firstName + " " + actor.lastName  +  ", ";
    } )
     this.actors = this.actors.slice(0,this.actors.length-2);
     this.actors = this.actors + " и други"
  }

  isFirstModal() : boolean{
    return this.modalId >0;
  }
}
