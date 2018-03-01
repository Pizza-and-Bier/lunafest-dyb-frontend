import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardGalleryComponent } from './item-card-gallery.component';

describe('ItemCardGalleryComponent', () => {
  let component: ItemCardGalleryComponent;
  let fixture: ComponentFixture<ItemCardGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
