import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderVideoTagComponent } from './builder-video-tag.component';

describe('BuilderVideoTagComponent', () => {
  let component: BuilderVideoTagComponent;
  let fixture: ComponentFixture<BuilderVideoTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderVideoTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderVideoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
