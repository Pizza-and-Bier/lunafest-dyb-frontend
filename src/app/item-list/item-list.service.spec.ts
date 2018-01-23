import { TestBed, inject } from '@angular/core/testing';

import { ItemListService } from './item-list.service';

describe('ItemListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemListService]
    });
  });

  it('should be created', inject([ItemListService], (service: ItemListService) => {
    expect(service).toBeTruthy();
  }));
});
