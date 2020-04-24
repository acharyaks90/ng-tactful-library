import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleVideoTagComponent } from './example-video-tag.component';

describe('ExampleVideoTagComponent', () => {
  let component: ExampleVideoTagComponent;
  let fixture: ComponentFixture<ExampleVideoTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleVideoTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleVideoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
