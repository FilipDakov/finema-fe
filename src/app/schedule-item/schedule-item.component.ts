import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Day } from '../models/day';
import { MovieScreenings } from '../models/movieScreenings';
import { Screening } from '../models/screening';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {

  @Input() public day :string;
  public movieScreenings : Array<MovieScreenings>;
  public map : Map<String,string> = new Map<string,string>();

  constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string) { }

  ngOnInit(): void {
    this.http.get(this.backendUrl.concat("/screening/currentScreenings/"+this.day))
    .subscribe(data => {
      this.movieScreenings = data as Array<MovieScreenings>;     
    });

    
    Object.entries(Day).forEach(([key, value]) => {
      this.map.set(key, value);
    });

   
  }

}
