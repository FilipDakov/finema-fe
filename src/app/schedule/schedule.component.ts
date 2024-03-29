import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/security/user';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

 public day: String = "";
 private user:User = JSON.parse(localStorage.getItem('user'));

  constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string) { }

  ngOnInit(): void {
    this.http.get<any>(this.backendUrl.concat("/today"))
    .subscribe(data => {
      console.log(data);
      this.day = data.message;    
    });

  }

  nameEqual( day:string) : boolean{
     return day == this.day;
  }

  btnClick( day: string){
    this.day = day;
  }

}
