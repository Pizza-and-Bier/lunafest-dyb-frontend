import { TestBed, async, inject } from '@angular/core/testing';

import { AuctionGuard } from './auction.guard';

describe('AuctionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuctionGuard]
    });
  });

  it('should ...', inject([AuctionGuard], (guard: AuctionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
