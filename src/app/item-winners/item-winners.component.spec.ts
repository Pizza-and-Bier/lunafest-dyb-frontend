import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWinnersComponent } from './item-winners.component';

describe('ItemWinnersComponent', () => {
  let component: ItemWinnersComponent;
  let fixture: ComponentFixture<ItemWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
