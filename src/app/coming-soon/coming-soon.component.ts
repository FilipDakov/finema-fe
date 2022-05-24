import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit {


  movies : Array<Movie>;

  constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string ) { }

  ngOnInit(): void {
    this.http.get(this.backendUrl.concat("/movies/getUpcoming"))
    .subscribe(data => {
     // console.log(data);
      this.movies= data as Movie[];
    } );
  }

}
