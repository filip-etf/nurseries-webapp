import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseryComponent } from './add-nursery.component';

describe('AddNurseryComponent', () => {
  let component: AddNurseryComponent;
  let fixture: ComponentFixture<AddNurseryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNurseryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNurseryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
