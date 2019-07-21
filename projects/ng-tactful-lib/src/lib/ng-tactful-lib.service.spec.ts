import { TestBed } from '@angular/core/testing';

import { NgTactfulLibService } from './ng-tactful-lib.service';

describe('NgTactfulLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTactfulLibService = TestBed.get(NgTactfulLibService);
    expect(service).toBeTruthy();
  });
});
