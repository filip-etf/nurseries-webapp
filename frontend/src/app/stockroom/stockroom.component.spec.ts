import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockroomComponent } from './stockroom.component';

describe('StockroomComponent', () => {
  let component: StockroomComponent;
  let fixture: ComponentFixture<StockroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
