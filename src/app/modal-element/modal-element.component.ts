import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-element',
  templateUrl: './modal-element.component.html',
  styleUrls: ['./modal-element.component.css']
})
export class ModalElementComponent implements OnInit {
  @Input() name;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    
  }

  open() { }

}
