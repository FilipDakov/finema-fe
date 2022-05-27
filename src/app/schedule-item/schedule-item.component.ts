import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalElementComponent } from '../modal-element/modal-element.component';
import { ModalTicketComponent } from '../modal-ticket/modal-ticket.component';
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

  constructor(private http: HttpClient,@Inject('BACKEND_URL') private backendUrl :string,
  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.http.get(this.backendUrl.concat("/screening/currentScreenings/"+this.day))
    .subscribe(data => {
      this.movieScreenings = data as Array<MovieScreenings>;     
    });

    
    Object.entries(Day).forEach(([key, value]) => {
      this.map.set(key, value);
    });

   
  }

  submitBtn(movieName:string,time:string,date:Date,screening: Screening){
          const modalRef = this.modalService.open(ModalTicketComponent);
              // console.log(el.message);
          modalRef.componentInstance.screening = screening;
          modalRef.componentInstance.movieName = movieName;
          modalRef.componentInstance.time = time;
          modalRef.componentInstance.day = this.map.get(this.day);
          modalRef.componentInstance.date = date;
  }

}
