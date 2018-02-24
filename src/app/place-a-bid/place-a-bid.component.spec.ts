import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceABidComponent } from './place-a-bid.component';

describe('PlaceABidComponent', () => {
  let component: PlaceABidComponent;
  let fixture: ComponentFixture<PlaceABidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceABidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceABidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
