import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutSuccessComponent } from './check-out-success.component';

describe('CheckOutSuccessComponent', () => {
  let component: CheckOutSuccessComponent;
  let fixture: ComponentFixture<CheckOutSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
