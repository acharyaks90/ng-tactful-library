import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgTactfulLibComponent } from './ng-tactful-lib.component';

describe('NgTactfulLibComponent', () => {
  let component: NgTactfulLibComponent;
  let fixture: ComponentFixture<NgTactfulLibComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTactfulLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTactfulLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
