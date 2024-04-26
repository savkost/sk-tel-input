import { TestBed } from '@angular/core/testing';

import { SkTelInputService } from './sk-tel-input.service';

describe('SkTelInputService', () => {
  let service: SkTelInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkTelInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
