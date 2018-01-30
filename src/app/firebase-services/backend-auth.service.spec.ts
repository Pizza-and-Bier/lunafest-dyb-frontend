import { TestBed, inject } from '@angular/core/testing';

import { BackendAuthService } from './backend-auth.service';

describe('BackendAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendAuthService]
    });
  });

  it('should be created', inject([BackendAuthService], (service: BackendAuthService) => {
    expect(service).toBeTruthy();
  }));
});
