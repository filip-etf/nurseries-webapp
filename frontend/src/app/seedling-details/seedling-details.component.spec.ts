import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedlingDetailsComponent } from './seedling-details.component';

describe('SeedlingDetailsComponent', () => {
  let component: SeedlingDetailsComponent;
  let fixture: ComponentFixture<SeedlingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedlingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedlingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
