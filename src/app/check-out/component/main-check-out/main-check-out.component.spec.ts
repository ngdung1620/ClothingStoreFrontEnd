import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCheckOutComponent } from './main-check-out.component';

describe('MainCheckOutComponent', () => {
  let component: MainCheckOutComponent;
  let fixture: ComponentFixture<MainCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCheckOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
