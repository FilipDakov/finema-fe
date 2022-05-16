import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-group-movies',
  templateUrl: './group-movies.component.html',
  styleUrls: ['./group-movies.component.css']
})
export class GroupMoviesComponent implements OnInit {

  movies : Array<Movie>;

  constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string ) { }

  ngOnInit(): void {
    this.http.get(this.backendUrl.concat("/movies/getValidMovies"))
    .subscribe(data => {
      console.log(data);
      this.movies= data as Movie[];
    } );
  }
}
