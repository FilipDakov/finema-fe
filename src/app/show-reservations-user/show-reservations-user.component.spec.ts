import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReservationsUserComponent } from './show-reservations-user.component';

describe('ShowReservationsUserComponent', () => {
  let component: ShowReservationsUserComponent;
  let fixture: ComponentFixture<ShowReservationsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReservationsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReservationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
