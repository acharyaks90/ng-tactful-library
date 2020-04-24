import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticComComponent } from './static-com.component';

describe('StaticComComponent', () => {
  let component: StaticComComponent;
  let fixture: ComponentFixture<StaticComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
