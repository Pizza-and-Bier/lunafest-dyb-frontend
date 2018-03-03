import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderComponent } from './item-order.component';

describe('ItemOrderComponent', () => {
  let component: ItemOrderComponent;
  let fixture: ComponentFixture<ItemOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
