import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMoviesComponent } from './group-movies.component';

describe('GroupMoviesComponent', () => {
  let component: GroupMoviesComponent;
  let fixture: ComponentFixture<GroupMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
