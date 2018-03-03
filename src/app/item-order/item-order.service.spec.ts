import { TestBed, inject } from '@angular/core/testing';

import { ItemOrderService } from './item-order.service';

describe('ItemOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemOrderService]
    });
  });

  it('should be created', inject([ItemOrderService], (service: ItemOrderService) => {
    expect(service).toBeTruthy();
  }));
});
