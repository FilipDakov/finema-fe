import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservationConfirmComponent } from './modal-reservation-confirm.component';

describe('ModalReservationConfirmComponent', () => {
  let component: ModalReservationConfirmComponent;
  let fixture: ComponentFixture<ModalReservationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservationConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReservationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
