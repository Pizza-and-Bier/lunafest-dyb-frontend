import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListFilterDialogComponent } from './item-list-filter-dialog.component';

describe('ItemListFilterDialogComponent', () => {
  let component: ItemListFilterDialogComponent;
  let fixture: ComponentFixture<ItemListFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
