import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryDetailsComponent } from './nursery-details.component';

describe('NurseryDetailsComponent', () => {
  let component: NurseryDetailsComponent;
  let fixture: ComponentFixture<NurseryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
