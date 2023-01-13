import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProblemComponent } from './stock-problem.component';

describe('StockProblemComponent', () => {
  let component: StockProblemComponent;
  let fixture: ComponentFixture<StockProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockProblemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
